// DEPRECATED

const database = require('./connection');



database.getItems = function () {
    database.query(
        `select
            item.id,
            item_category.name as 'category',
            item.name, 
            item.description,
            item.price,
            item_inventory.quantity,
            discount.name as 'discount_name',
            discount.description as 'discount_desc',
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
        function(err, results, fields) {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
};

module.exports = database;