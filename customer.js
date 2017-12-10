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
    console.log("Connected as id: "+connection.threadId);
    start();
})

function postAuction() {
    // prompt for info about what is for sale
    inquirer
        .prompt([
        {
            id   : 1,
            name : "gloves",
            price: 10.00,
        },
        {
            id   : 2,
            name : "scissors",
            price: 4.00,
        },
        {
            id   : 3,
            name : "boots",
            price: 59.00,
        },
        {
            id   : 4,
            name : "cooler",
            price: 10.00,
        },
        {
            id   : 5,
            name : "echo dot",
            price: 30.00,
        },
        {
            id   : 6,
            name : "Printer",
            price: 1500.00,
        },
        {
            id   : 7,
            name : "Handful of Keys",
            price: 10.00,
        },
        {
            id   : 8,
            name : "Ball",
            price: 56.00,
        },
        {
            id   : 9,
            name : "parsley",
            price: 20.00,
        },
        {
            id   : 10,
            name : "sanpellegrino",
            price: 10.00,
        },
    ])
}

        validate: function(value) {
            if (isNaN(value) === false) {
            return true;
            }
            return false;
        }
      }
    ])
        .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
        "INSERT INTO auctions SET ?",
        {
            item_name: answer.item,
            category: answer.category,
            starting_bid: answer.startingBid,
            highest_bid: answer.startingBid
        },
        function(err) {
            if (err) throw err;
            console.log("Your auction was created successfully!");
            // re-prompt the user for if they want to bid or post
            start();