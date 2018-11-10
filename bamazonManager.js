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
    youSuck();
});

function youSuck() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Please select an option",
            choices: [{
                name: "View Products for Sale",
                value: "ViewProd"
            },
            {
                name: "View Low Inventory",
                value: "Inventory"
            },
            {
                name: "Add to Inventory",
                value: "Add"
            },
            {
                name: "Add New Product",
                value: "Product"
            }
            ]
        }
    ]).then(function (answer) {
        var selection = answer.choice;

        switch (selection) {
            case "ViewProd":
                viewProduct();
                break;

            case "Inventory":
                lowInventory();
                break;

            case "Add":
                addInventory();
                break;

            case "Product":
                newProduct();
                break;

        }

    })
}

function viewProduct() {
    var query = "SELECT item_id as 'Item ID', product_name as 'Product Name', price as 'Price', stock_quantity as 'Stock Quantity' FROM products";
    connection.query(query, function (err, result) {
        if (err) throw err;
       
           console.table(result);
        connection.end();
    });

}


function lowInventory() {
    var query = "SELECT item_id as 'Item ID', product_name as 'Product Name', price as 'Price', stock_quantity as 'Stock Quantity' FROM products WHERE stock_quantity < 5";
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.table(result);
        connection.end();
    });
}

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What item id?",
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
            message: "How many ?",
            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                return false;
            }

        }

    ]).then(function (answer) {
        var x = "SELECT stock_quantity FROM products WHERE ?"
        connection.query(x, { item_id: answer.id }, function (err, res) {
            if (err) throw err;


            var update = "UPDATE bamazon_db.products SET stock_quantity = stock_quantity + " + parseInt(answer.quantity) + " WHERE item_id = " + parseInt(answer.id);
            connection.query(update, { item_id: answer.id }, function (err, res) {
                if (err) throw err;
                console.log("Just added");
                connection.end();

            });

        });
    });
}

function newProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Product Name?",
            validate: function (value) {
                return value.length > 0;
            }

        },
        {
            type: "input",
            name: "department",
            message: "Department Name?",
            validate: function (value) {
                return value.length > 0;
            }

        },
        {
            type: "input",
            name: "price",
            message: "Price?",
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
            message: " Stock Quantity?",
            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function (answer) {
        var insert = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('" + answer.name + "', '" + answer.department + "', " + parseFloat(answer.price) + ", " + parseInt(answer.quantity) + ")";
        connection.query(insert, function (err, result) {
            if (err) throw err;
            console.log("Item Added.");
            connection.end();

        });
    });
}