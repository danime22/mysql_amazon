var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Mahalko!!",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;

});

function sale() {
    var query = "SELECT item_id as 'Item ID', product_name as 'Product Name', price as 'Price' FROM products";
    connection.query(query, function (err, result) {
        if (err) throw err;

        console.table(result);

        question();
    });
}

sale();

function question() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the ID of the product you want to buy?",
            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units of this product you would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                return false;
            }

        }
    ]).then(function (answer) {
        var z = "select count(*) as count from bamazon_db.products where ?";
        connection.query(z, { item_id: answer.id }, function (err, res) {
            if (err) throw err;

            if (res[0].count == 0) {
                console.log("Invalid ID. Please enter a valid Item ID.");
                connection.end();
            } else {
                var query = "SELECT stock_quantity FROM products WHERE ?";

                connection.query(query, { item_id: answer.id }, function (err, res) {
                    if (err) throw err;

                    if (answer.quantity > res[0].stock_quantity) {
                        console.log("Insufficient quantity!");
                        connection.end();
                    }
                    else {
                        var update = "UPDATE products SET stock_quantity = stock_quantity - " + parseInt(answer.quantity) + " WHERE item_id = " + parseInt(answer.id);
                        connection.query(update, function (err, res) {
                            if (err) throw err;

                            var query = "SELECT price FROM products WHERE ?";
                            connection.query(query, { item_id: answer.id }, function (err, res) {
                                if (err) throw err;

                                var sales = res[0].price * answer.quantity;

                                var update = "UPDATE products SET product_sales = product_sales + " + sales + " WHERE item_id = " + parseInt(answer.id);
                                connection.query(update, function (err, res) {
                                    if (err) throw err;

                                    console.log("\nYOUR TOTAL IS: " + sales);
                                    connection.end();

                                });
                            });

                        });
                    }

                });

            }
        });


    });
}