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

function start() { // defined the start function
    // prompt for info about what is for sale
    console.log("\n!!!!!!!!!!!!!!!!!WELCOME TO BAMAZON!!!!!!!!!!!!!!!!!!!!!!\n");
    console.log("              HERE IS OUR PRODUCT LIST AND INVENTORY\n");
    console.log("ID    PRODUCT              PRICE        QUANTITY\n");
    
    

    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;

        data.forEach(function (val, index) {
            console.log(" " + data[index].item_id + "     " + data[index].product_name + "         $" +
                data[index].price + "        " + data[index].stock_quantity);
            console.log("---------------------------------------------------");
        });
        console.log("\n");
        shopping(data);


    });

}

    function shopping(data) { // defined the start function 
        // prompt for info about what is for sale
        var product;
        var quantity;
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
                product = answer.choice;
    
                inquirer
                    .prompt([{
                        type: "input",
                        name: "num",
                        message: "How many would you like to purchase?"
                    }]).then(function (number) {
                        quantity = number.num;
                        var cost;
                        var curProduct;
                        data.forEach(function (val, index) {
                            if (val.product_name === product) {
                                cost = val.price;
                                curProduct = val;
                            }
                        });
                        var totalcost = cost * quantity;
    
    
                        // calculate quantity times cost of product and then display it to user
                        // updating the sql table to account for the product purchased
                        var prodId = curProduct.item_id;
                        var curQuantity = curProduct.stock_quantity;
    
                        var newQuantity = curQuantity - quantity;
                        if (newQuantity >= 0) {
                            console.log("\nYou purchased a total of " + quantity + " " + product + " for a total of $" + totalcost);
                            updateDatabase(newQuantity, prodId);
                        } else {
                            console.log("\nINSUFFICIENT QUANTITY PLEASE TRY ANOTHER PURCHASE\n");
                            shopping(data);
                        }
                    });
            });
    
    }
    
    
    function updateDatabase(newQuantity, prodId) {
    
    
        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuantity, prodId], function (err, data) {
            if (err) throw err;
    
        });
        connection.end();
        console.log("Thank you for shopping!!!");
    
    }
    