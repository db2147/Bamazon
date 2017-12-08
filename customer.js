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
})