DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2)NULL,
    product_sales DECIMAL(11,2)NULL,
    stock_quantity INT NOT NULL,

    PRIMARY KEY(item_id)
);

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(200) NOT NULL,
    over_head_costs DECIMAL(10,2)NULL,

    PRIMARY KEY(department_id)
);


INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("iphone X", "Electronic", 1000.09, 0.00, 100);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Samsung Galaxy Note 9", "Electronic", 900.19, 0.00, 150);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Jacket", "Clothing", 200.14, 0.00, 300);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Women's Jeans", "Clothing", 250.11, 0.00, 600);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Toaster", "Appliances", 210.09, 0.00, 68);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Matte Lipstick", "Cosmetics", 20.00, 0.00, 1000);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Dog Food", "Pet Supplies", 40.34, 0.00, 1200);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Face Powder", "Cosmetics", 21.92, 0.00, 999);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Table", "Furniture", 500.87, 0.00, 70);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Couch", "Furniture", 1300.45, 0.00 400);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Pet Supplies", 1300 );

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronic", 900 );

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 800 );

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Cosmetics", 600 );

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Furniture", 1000 );

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Appliances", 1800 );
