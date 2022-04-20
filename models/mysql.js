/**
 * This file responds for communicating with the database.
 * Could be splited into different files according to
 * functionality later.
 */

const pool = require("./pool");
const queries = require("./queries");

/**
 * Gets all items from db and passes them to response collback.
 * @param { function } response - callback function takes (err, result, fields)
 */
exports.getItems = async (response) => {
  pool.query(queries.getItems, function (err, result, fields) {
    if (err) {
      console.log(err.message);
    }
    response(err, result, fields);
  });
};

/**
 * Gets user pswd by given email and passes it to response callback.
 * @param { String } email - email of requested user
 * @param { function } response - callback function takes (err, result, fields)
 */
exports.getPassword = async (email, response) => {
  pool.query(
    "SELECT user.id, user.path_to_logo, user.pswd, user_type.name as 'type' FROM user, user_type WHERE user.email = ? AND user.usertype_id = user_type.id",
    [email],
    (err, result, fields) => {
      if (err) {
        console.log(err.message);
      }
      response(err, result, fields);
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
    (err, result, field) => {
      if (err) {
        console.log(err);
      }
      response(err, result, field);
    }
  );
};

exports.getPersonalInfo = async (userId, response) => {
  pool.query(queries.personalInfo, [userId], (err, result, fields) => {
    if (err) {
      console.log(err.message);
    }
    response(err, result, fields);
  });
};

exports.getInventory = async (userId, response) => {
  pool.query(queries.getInventory, [userId], (err, result, fields) => {
    if (err) {
      console.log(err.message);
    }
    response(err, result, fields);
  });
};

exports.getItemsForOrder = async (itemsIds) => {
  try {
    [rows, fields] = await pool.promise().query(`
    SELECT 
      item.id, 
      item.price, 
      item_inventory.quantity 
    FROM 
      item, 
      item_inventory 
    WHERE 
      item.id IN (${itemsIds.join(",")})
      AND
      item.inventory_id = item_inventory.id
    ;
    `);
    return rows;
  } catch (err) {
    console.log(err.message);
    return undefined;
  }
};

exports.getUserBalance = async (userId) => {
  try {
    [rows, fields] = await pool.promise().query(
      `
    SELECT 
      user.coins
    FROM 
      user 
    WHERE 
      user.id = ?
    ;
    `,
      [userId]
    );
    return rows[0].coins;
  } catch (err) {
    console.log(err.message);
    return undefined;
  }
};

exports.placeOrder = async (userId, total, itemsInfo) => {
  let status = false;
  try {
    let connection = await pool.promise().getConnection();
    connection.config.namedPlaceholders = true;
    await connection.query(`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`);
    await connection.beginTransaction();
    await connection.query(
      `
        SELECT coins FROM user WHERE user.id = ? FOR UPDATE;
      `,
      [userId]
    );
    await connection.query(
      `
        UPDATE user SET coins = coins - ?  WHERE user.id = ?;`,
      [total, userId]
    );

    await connection.query(
      `
        INSERT INTO order_details (user_id, total, items) VALUES (?, ?, "?");
        `,
      [
        userId,
        total,
        JSON.stringify(
          itemsInfo.map((item) => ({ i: item.id, q: item.quantity }))
        ),
      ]
    );

    await itemsInfo.map(async (item) => {
      await connection.query(
        `
          SELECT * FROM inventory WHERE user_id = ? and item_id = ? FOR UPDATE;`,
        [userId, item.id]
      );
      await connection.query(
        `
          INSERT INTO inventory (user_id, item_id, quantity)
            VALUES (?,?,?)
            ON DUPLICATE KEY UPDATE quantity = quantity + ?;`,
        [userId, item.id, item.quantity, item.quantity]
      );

      await connection.query(
        `
          SELECT * FROM item_inventory WHERE id IN (SELECT inventory_id
            FROM item 
            WHERE item.id = ?) 
            FOR UPDATE;`,
        [item.id]
      );

      await connection.query(
        `
          UPDATE item_inventory 
            SET quantity = quantity - ?
            WHERE item_inventory.id IN (
              SELECT inventory_id
                FROM item 
                WHERE item.id = ?);
        `,
        [item.quantity, item.id]
      );
    });
    await connection.commit();
    //connection.destroy();
    await connection.release();

    status = true;
  } catch (err) {
    console.log(err.message);
    await connection.rollback();
    await connection.release();
    status = false;
  }
  return status;
};
