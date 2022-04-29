/**
 * This file stores SQL statements for communication with database;
 */

// Statement to get information about the items.
exports.getItems = `SELECT
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
`;

// Statement to add user;
exports.createUser = `
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
`;

exports.getPassword = 'SELECT "user".id, "user".path_to_logo, "user".pswd, user_type.name AS type FROM ecommerce_db.user, ecommerce_db.user_type WHERE "user".email = $1 AND "user".usertype_id = user_type.id';

exports.getInventory = `
SELECT item_id as id, name, path_to_image, quantity FROM ecommerce_db.inventory, ecommerce_db.item WHERE user_id = $1 AND inventory.item_id = item.id;
`;
// Statement to get user info.
exports.personalInfo = `
SELECT id, email, firstname, lastname, username, coins, high_score FROM ecommerce_db.user WHERE id = $1;
`;

exports.getItemsByIds = (ids) => `
SELECT 
  item.id, 
  item.price, 
  item_inventory.quantity 
FROM 
  ecommerce_db.item, 
  ecommerce_db.item_inventory 
WHERE 
  item.id IN (${ids.join(",")})
  AND
  item.inventory_id = item_inventory.id
;
`;

exports.getBalance = `
SELECT 
  "user".coins
FROM 
  ecommerce_db.user 
WHERE 
  "user".id = $1
;
`;

exports.lockUser = `
SELECT coins FROM ecommerce_db.user 
WHERE "user".id = $1 FOR UPDATE;
`;

exports.reduceBalance = `
UPDATE ecommerce_db.user SET coins = coins - $1  WHERE "user".id = $2;`;

exports.addOrder = `
INSERT INTO ecommerce_db.order_details (user_id, total) VALUES ($1, $2) RETURNING id;
`;

exports.addOrderItem = `
INSERT INTO ecommerce_db.order_items (quantity, item_id, order_id) VALUES ($1, $2, $3);
`;

exports.lockInventory = `
SELECT * 
FROM ecommerce_db.inventory 
WHERE user_id = $1 and item_id = $2 
FOR UPDATE;`;

exports.addToInventory = `
INSERT INTO ecommerce_db.inventory (user_id, item_id, quantity)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, item_id) DO UPDATE 
  SET quantity = inventory.quantity + $3
;`;

exports.lockItemInventory = `
SELECT * 
FROM ecommerce_db.item_inventory 
WHERE id IN (SELECT inventory_id
  FROM ecommerce_db.item 
  WHERE item.id = $1) 
FOR UPDATE;
`;

  exports.reduceItemInventory = `
  UPDATE ecommerce_db.item_inventory 
    SET quantity = quantity - $1
    WHERE item_inventory.id IN (
      SELECT inventory_id
        FROM ecommerce_db.item 
        WHERE item.id = $2);
`;