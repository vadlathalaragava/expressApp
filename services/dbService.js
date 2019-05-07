var mysql      = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password : 'smartant',
    port : 3306, //port mysql
    database:'nodejs',
    connectionLimit: 10,
    supportBigNumbers: true
});

var service = {};
service.getCustomers = function(callback){
  var sql = "SELECT * FROM customer";
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback([{}]); return; }
    // make the query
    connection.query(
      sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback([{}]); return; }
      callback(results);
    });
  });
  //return result; //line 24 execute before db reply
};

service.addCustomer = function(customer,callback) {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback("fail"); return; }
        connection.query("INSERT INTO customer set ? ",customer, function(err, results) {
          if(err){
           console.log("Error Selecting : %s ",err );
           callback("fail");
          }else{
           callback("success");
         }
      });
    });
};

service.deleteCustomer = function(id,callback){
    var sql = "delete FROM customer where id='"+id+"'";
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback("fail"); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback("fail"); return; }
      callback("success");
    });
  });
}

service.getCustomerById = function(id,callback){
  var record = {};
  var sql = "SELECT * FROM customer where id='"+id+"'";
  console.log("sql:"+sql);
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback({}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback({}); return; }
      if(results.length == 0){
        callback(record);
      }else{
        callback(results[0]);
      }
    });
  });

};
service.updateCustomer = function(customer,callback){
         pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback("fail"); return; }
        connection.query("UPDATE customer set ? WHERE id = ? ",[customer,customer.id], function(err, results) {
          if(err){
           console.log("Error Selecting : %s ",err );
           callback("fail");
          }else{
           callback("success");
         }
      });
    });
};

module.exports = service;