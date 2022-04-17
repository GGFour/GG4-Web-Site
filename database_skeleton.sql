DROP DATABASE IF EXISTS ecommerce_db;
CREATE DATABASE ecommerce_db;
USE ecommerce_db;

CREATE TABLE shopping_session (
    id INTEGER NOT NULL AUTO_INCREMENT,
    total INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE item_category (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE game (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE item_inventory (
    id INTEGER NOT NULL AUTO_INCREMENT,
    quantity INTEGER NOT NULL DEFAULT 100,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE discount (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(32),
    description TEXT,
    active BOOLEAN,
    starts_at TIMESTAMP,
    ends_at TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE item(
    id INTEGER NOT NULL AUTO_INCREMENT,
    category_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    inventory_id INTEGER NOT NULL,
    discount_id INTEGER,
    name VARCHAR(32),
    description TEXT,
    path_to_image VARCHAR(255),
    price INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES item_category(id),
    FOREIGN KEY (game_id) REFERENCES game(id),
    FOREIGN KEY (inventory_id) REFERENCES item_inventory(id),
    FOREIGN KEY (discount_id) REFERENCES discount(id)
);

CREATE TABLE user_type (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    name VARCHAR(32),
    PRIMARY KEY (id)
);

CREATE TABLE user_payment (
    id INTEGER NOT NULL AUTO_INCREMENT,
    payment_types VARCHAR(32),
    provider VARCHAR(32),
    account_number INTEGER,
    expiry VARCHAR(5),
    PRIMARY KEY (id)
);

CREATE TABLE user (
    id INTEGER NOT NULL AUTO_INCREMENT,
    email VARCHAR(32) UNIQUE NOT NULL,
    firstname VARCHAR(32) UNIQUE NOT NULL,
    lastname VARCHAR(32) UNIQUE NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL,
    pswd VARCHAR(255) NOT NULL,
    path_to_logo VARCHAR(32),
    payment_id INTEGER,
    usertype_id INTEGER NOT NULL DEFAULT 1,
    session_id INTEGER,
    coins INTEGER NOT NULL DEFAULT 200,
    high_score INTEGER,
    subscribed BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (payment_id) REFERENCES user_payment(id),
    FOREIGN KEY (usertype_id) REFERENCES user_type(id),
    FOREIGN KEY (session_id) REFERENCES shopping_session(id),
    CHECK (coins >= 0),
    CHECK (high_score >= 0)
);

CREATE TABLE inventory (
    id INTEGER NOT NULL AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE order_details(
    id INTEGER NOT NULL AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    total INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE order_items (
    id INTEGER NOT NULL AUTO_INCREMENT,
    quantity INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (order_id) REFERENCES order_details(id)
);

CREATE TABLE cart_item (
    id INTEGER NOT NULL AUTO_INCREMENT,
    session_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (session_id) REFERENCES shopping_session(id)
);

