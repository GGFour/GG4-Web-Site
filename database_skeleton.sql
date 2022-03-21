USE GAME_DB;

CREATE table shopping_session (
    id INTEGER PRIMARY KEY,
    total integer,
    created_at timestamp,
    modified_at timestamp
);

CREATE table item_category (
    id INTEGER PRIMARY KEY,
    name VARCHAR(32),
    description text,
    created_at timestamp,
    modified_at timestamp
);

CREATE table items_inventory (
    id INTEGER PRIMARY KEY,
    quantity integer,
    modified_at timestamp
);

CREATE table discount (
    id INTEGER PRIMARY KEY,
    name VARCHAR(32),
    description text,
    active boolean,
    starts_at timestamp,
    modified_at timestamp
);

CREATE TABLE user_type (id INTEGER PRIMARY KEY, name VARCHAR(32));

CREATE TABLE user_payment (
    id INTEGER PRIMARY KEY,
    payment_types VARCHAR(32),
    provider VARCHAR(32),
    account_number INTEGER,
    expiry VARCHAR(32)
);

CREATE TABLE user (
    id INT PRIMARY KEY,
    email VARCHAR(32),
    firstname VARCHAR(32),
    lastname VARCHAR(32),
    username VARCHAR(32),
    password VARCHAR(32),
    FOREIGN KEY (payment_id) REFERENCES user_payment(id),
    FOREIGN KEY (type_id) REFERENCES user_type(id),
    FOREIGN KEY (session_id) REFERENCES shopping_session(id),
    path_to_logo VARCHAR(32),
    subscribed BOOLEAN,
    coins INT,
    high_score INT,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

CREATE TABLE inventory (
    id INTEGER PRIMARY KEY,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE order_details(
    id INTEGER PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES user(id),
    total INT,
    created_at TIMESTAMP
);

CREATE TABLE order_items (
    id INTEGER PRIMARY KEY,
    quantity INT,
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (order_id) REFERENCES order_detailes(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    created_at TIMESTAMP
);

CREATE TABLE cart_item (
    id INTEGER PRIMARY KEY,
    session_id INT,
    FOREIGN KEY (item_id) REFERENCES item(id),
    quantity INT,
    modified_at TIMESTAMP
);

CREATE TABLE item(
    id INTEGER PRIMARY KEY,
    name VARCHAR(32),
    description TEXT(32),
    path_to_image TEXT(32),
    price INT,
    FOREIGN KEY (category_id) REFERENCES item_category(id),
    FOREIGN KEY (inventory_id) REFERENCES item_inventory(id),
    FOREIGN KEY (discount_id) REFERENCES discount(id),
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);