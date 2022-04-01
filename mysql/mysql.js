const connection = require("./queries");

class Database {
  constructor(connection) {
    this.connection = connection;
  }

  getItems(response) {
    this.connection.query(
      `select
            item.id,
            item_category.name as 'category',
            item.name, 
            item.description,
            item.price,
            item_inventory.quantity,
            discount.name as 'discount_name',
            discount.description as 'discount_desc',
        #    discount.value as 'discount_value',
        #    discount.percentage as 'discount_percentage',
            discount.active as 'discount_active',
            game.name as 'Game name',
            item.path_to_image
        from 
            ((item 
            inner join item_inventory on item.inventory_id = item_inventory.id)
            left join discount on item.discount_id = discount.id), 
            item_category,
            game
        where
            item.category_id = item_category.id
        ;`,
      function (err, result, field) {
        if (err) {
          console.log(err.message);
        }
        response(err, result, field);
      }
    );
  }
  getPassword(login) {
    this.connection.query(
      `
            SELECT pswd FROM user WHERE email=${login};
            `,
      function (err, result, field) {
        if (err) {
          console.log(err.message);
        }
        response(err, result, field);
      }
    );
  }
}

let database = new Database(connection);

module.exports = database;
