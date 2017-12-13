var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host    : 'localhost',
    port    : 3306,
    user    : 'root',
    password: 'Superdave214',
    database: 'bamazon_db'
});

connection.connect(function(err){
   if (err) throw err;
   //run the start function after the connection is made to prompt the user
    start();
});

function start() {   // defined the start function
    // prompt for info about what is for sale
    console.log("!!!!!!!!!!!!!!!!!WELCOME TO BAMAZON!!!!!!!!!!!!!!!!!!!!!!");
    console.log("HERE IS OUR PRODUCT LIST AND INVENTORY/N");
    connection.query(
        "SELECT * FROM products",
        function (err) throw err;
            dataArr = data;
            data.forEach(function (val, index) {
                console.log("ID:" + data[index].item_id + " PRODUCT:" + data[index].product_name + "PRICE:" + 
            data[index].price + " QUANTITY:" + data[index].stock_quantity);
                           console.log("---------------------------------------------------");
            });
            console.log("/n");
            shopping();
        });

    }

    function shopping() { // defined the start function 
        // prompt for info about what is for sale
        inquirer
            .prompt([{
                type: "list",
                name: "choice",
                message: "What is the name of the item you would you like to purchase?",
                choices: ["gloves",
                    "cooler",
                    "echo dot",
                    "Printer",
                    "football",
                    "parsley"
                ]
            }]).then(function (answer) {
                // when finished prompting, insert a new item into the db with that info 
                console.log(answer.choice);
                
                inquirer
                    .prompt([{
                        type: "input",
                        name: "num",
                        message: "How many would you like to purchase?"
                    }]).then(function (number) {
                        console.log(number.num);
                        // calculate quantity times cost of product and then display it to user
                           // updating the sql table to account for the product purchased
                    });
            });

        }
    
    
    
    
    
    
    
    