var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'me',
    password: 'Superdave214',
    database: 'my_db'
});