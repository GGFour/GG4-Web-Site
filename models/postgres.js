const pool = require("./pgpool");
const queries = require("./queries");

/**
 * Gets all items from db and passes them to response collback.
 * @param { function } response - callback function takes (err, result)
 */
exports.getItems = async (response) => {
  pool.query(
    `SELECT
    item.id,
    item_category.name AS category,
    item.name, 
    item.description,
    item.price,
    item_inventory.quantity,
    discount.name AS discount_name,
    discount.description AS discount_desc,
    discount.active AS discount_active,
    game.name AS game_name,
    item.path_to_image
    FROM 
    ((ecommerce_db.item 
    INNER JOIN ecommerce_db.item_inventory ON item.inventory_id = item_inventory.id)
    LEFT JOIN ecommerce_db.discount ON item.discount_id = discount.id), 
    ecommerce_db.item_category,
    ecommerce_db.game
    WHERE
    item.category_id = item_category.id
    ;
`,
    function (err, result) {
      if (err) {
        console.log(err.message);
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
    'SELECT "user".id, "user".path_to_logo, "user".pswd, user_type.name AS type FROM ecommerce_db.user, ecommerce_db.user_type WHERE "user".email = $1 AND "user".usertype_id = user_type.id',
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
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
    `
        INSERT INTO ecommerce_db.user (
            email,
            username,
            firstname,
            lastname,
            pswd
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
        );
    `,
    [
      credentials.email,
      credentials.username,
      credentials.firstname,
      credentials.lastname,
      credentials.password,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
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
    `
    SELECT id, email, firstname, lastname, username, coins, high_score FROM ecommerce_db.user WHERE id = $1;
    `,
    [userId],
    (err, result) => {
      if (err) {
        console.log(err.message);
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
    pool.query(`
        SELECT item_id as id, name, path_to_image, quantity FROM ecommerce_db.inventory, ecommerce_db.item WHERE user_id = $1 AND inventory.item_id = item.id;
    `, [userId], (err, result) => {
      if (err) {
        console.log(err.message);
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
      const result = await pool.query(`
      SELECT 
        item.id, 
        item.price, 
        item_inventory.quantity 
      FROM 
        ecommerce_db.item, 
        ecommerce_db.item_inventory 
      WHERE 
        item.id IN (${itemsIds.join(",")})
        AND
        item.inventory_id = item_inventory.id
      ;
      `);
      return result.rows;
    } catch (err) {
      console.log(err.message);
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
        `
      SELECT 
        "user".coins
      FROM 
        ecommerce_db.user 
      WHERE 
        "user".id = $1
      ;
      `,
        [userId]
      );
      return result.rows[0].coins;
    } catch (err) {
      console.log(err.message);
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
      await client.query('BEGIN');
      // Locking user money.
      await client.query(
        `
          SELECT coins FROM ecommerce_db.user WHERE "user".id = $1 FOR UPDATE;
        `,
        [userId]
      );
      // Decrement user money.
      await client.query(
        `
          UPDATE ecommerce_db.user SET coins = coins - $1  WHERE "user".id = $2;`,
        [total, userId]
      );
      // Creating new order.
      const orderId = (await client.query(
        `
          INSERT INTO ecommerce_db.order_details (user_id, total) VALUES ($1, $2) RETURNING id;
          `,
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
          `
          INSERT INTO ecommerce_db.order_items (quantity, item_id, order_id) VALUES ($1, $2, $3);
          `,
          [item.quantity, item.id, orderId]
        );
        // Locking the user inventory.
        await client.query(
          `
            SELECT * FROM ecommerce_db.inventory WHERE user_id = $1 and item_id = $2 FOR UPDATE;`,
          [userId, item.id]
        );
        // Adding item to user inventory.
        await client.query(
          `
          INSERT INTO ecommerce_db.inventory (user_id, item_id, quantity)
          VALUES ($1, $2, $3)
          ON CONFLICT (user_id, item_id) DO UPDATE 
            SET quantity = inventory.quantity + $4;`,
          [userId, item.id, item.quantity, item.quantity]
        );
        // Locking quantity of available items.
        await client.query(
          `
            SELECT * FROM ecommerce_db.item_inventory WHERE id IN (SELECT inventory_id
              FROM ecommerce_db.item 
              WHERE item.id = $1) 
              FOR UPDATE;`,
          [item.id]
        );
  
        // Decreasing quantity of available items.
        await client.query(
          `
            UPDATE ecommerce_db.item_inventory 
              SET quantity = quantity - $1
              WHERE item_inventory.id IN (
                SELECT inventory_id
                  FROM ecommerce_db.item 
                  WHERE item.id = $2);
          `,
          [item.quantity, item.id]
        );
      });
      await client.query('COMMIT');
  
      status = true;
    } catch (err) {
      console.log(err.message);
      await client.query('ROLLBACK');
      status = false;
    } finally {
      client.release();
    }
    return status;
  };
  
