const pool = require("./pgpool");
const queries = require("./queries");

/**
 * Gets all items from db and passes them to response collback.
 * @param { function } response - callback function takes (err, result)
 */
exports.getItems = async (response) => {
  pool.query(
    queries.getItems,
    function (err, result) {
      if (err) {
        console.error(err.message);
        return response(err, result);
      }
      response(err, result.rows);
    }
  );
};

/**
 * Gets user pswd by given email and passes it to response callback.
 * @param { String } email - email of requested user
 * @param { function } response - callback function takes (err, result)
 */
exports.getPassword = async (email, response) => {
  pool.query(
    queries.getPassword,
    [email],
    (err, result) => {
      if (err) {
        console.error(err);
        return response(err, result);
      }
      response(err, result.rows);
    }
  );
};

/**
 * Adds user to database.
 * @param { Object } credentials
 * @param { function } response - callback function
 */
exports.createUser = async (credentials, response) => {
  pool.query(
    queries.createUser,
    [
      credentials.email,
      credentials.username,
      credentials.firstname,
      credentials.lastname,
      credentials.password,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return response(err, result);
      }
      response(err, result);
    }
  );
};

/**
 * Returns object with information about user.
 * @param {Integer} userId
 * @param {Array} response - array containing one object with user info
 */
exports.getPersonalInfo = async (userId, response) => {
  pool.query(
    queries.personalInfo,
    [userId],
    (err, result) => {
      if (err) {
        console.error(err.message);
        return response(err, result);
      }
      response(err, result.rows);
    }
  );
};

/**
 * Returns inventory of user
 * @param {Integer} userId 
 * @param {Array} response - array containing objects {id, quantity}, where id - id of item
 */
 exports.getInventory = async (userId, response) => {
    pool.query(queries.getInventory, [userId], (err, result) => {
      if (err) {
        console.error(err.message);
        return response(err, result);
      }
      response(err, result.rows);
    });
  };
  
  /**
   * Returns array of objects with item prices an availability
   * @param {Array} itemsIds 
   * @returns 
   */
  exports.getItemsForOrder = async (itemsIds) => {
    try {
      const result = await pool.query(queries.getItemsByIds(itemsIds));
      return result.rows;
    } catch (err) {
      console.error(err.message);
      return undefined;
    }
  };
  
  /**
   * Returns user balance for checking the transaction.
   * @param {Integer} userId 
   * @returns 
   */
  exports.getUserBalance = async (userId) => {
    try {
      const result = await pool.query(
        queries.getBalance,
        [userId]
      );
      return result.rows[0].coins;
    } catch (err) {
      console.error(err.message);
      return undefined;
    }
  };

  /**
 * Creates order transaction for database
 * @param {Integer} userId 
 * @param {Integer} total - total price of order
 * @param {Array} itemsInfo - array containing objects {id:, quantity:}
 * @returns {Boolean} status of transaction
 */
exports.placeOrder = async (userId, total, itemsInfo) => {
    let status = false;
    let client = await pool.connect();
    try {
      await client.query(`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`);
      // Start transaction
      await client.query('BEGIN');
      // Locking user money.
      await client.query(
        queries.lockUser,
        [userId]
      );
      // Decrement user money.
      await client.query(
        queries.reduceBalance,
        [total, userId]
      );
      // Creating new order.
      const orderId = (await client.query(
        queries.addOrder,
        [
          userId,
          total
        ]
      )).rows[0].id;

      // Adding information about each item.
      await itemsInfo.forEach(async (item) => {
        if (item.quantity <=0) return;
        // Adding items to order history.
        await client.query(
          queries.addOrderItem,
          [item.quantity, item.id, orderId]
        );
        // Locking the user inventory.
        await client.query(
          queries.lockInventory,
          [userId, item.id]
        );
        // Adding item to user inventory.
        await client.query(
          queries.addToInventory,
          [userId, item.id, item.quantity]
        );
        // Locking quantity of available items.
        await client.query(
          queries.lockItemInventory,
          [item.id]
        );
  
        // Decreasing quantity of available items.
        await client.query(
          queries.reduceItemInventory,
          [item.quantity, item.id]
        );
      });
      await client.query('COMMIT');
  
      status = true;
    } catch (err) {
      console.error(err.message);
      await client.query('ROLLBACK');
      status = false;
    } finally {
      client.release();
    }
    return status;
  };
  
