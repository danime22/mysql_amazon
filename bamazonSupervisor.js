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
    question();

});

function question() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Select an option",
            choices: [{
                name: "View Product Sales by Department",
                value: "ProductSales"
            },
            {
                name: "Create New Department",
                value: "NewDepartment"
            }
            ]

        }
    ]).then(function (answer) {
        var selection = answer.choice;
        switch (selection) {
            case "ProductSales":
                productSales();
                break;

            case "NewDepartment":
                createDepartment();

                break;
        }
    })
}

function productSales() {

    var query = "SELECT d.department_id as 'Department ID', p.department_name as 'Department Name', d.over_head_costs as 'Overhead Costs', p.product_sales as 'Product Sales', (SUM(p.product_sales) - SUM(d.over_head_costs)) AS 'Total Profit' FROM bamazon_db.products p  LEFT JOIN bamazon_db.departments d ON p.department_name = d.department_name   GROUP BY d.department_id, p.department_name, d.over_head_costs, p.product_sales";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.table(result);
        connection.end();
    });
}

function createDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Department name?"
        },
        {
            type: "input",
            name: "cost",
            message: "Overhead cost?",
            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                return false;
            }
        }
    ]).then( answer =>{
        connection.query(
            "INSERT INTO departments SET department_name = ?, over_head_costs = ?",
            [answer.name, answer.cost],
            function (err, data) {
                if (err) throw err;
                connection.query(
                    "SELECT department_id as 'Department ID', over_head_costs as 'Overhead Costs', poduct_sales as 'Product Sales' FROM departments",
                    (err, data) =>{
                        console.table(data);

                        connection.end();
                      
                    }
                )
                
            }
        )
    });

}