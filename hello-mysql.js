//page 25 
//http://13.126.54.164/rest-api/node-js-ppt/express-js-guide.pdf

var mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'smartant'
});
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
if (err) throw err;
console.log('The solution is: ', rows[0].solution);
});
connection.end();