var express = require('express');
var router = express.Router();
var dbService = require('../services/dbService');

router.get('/', function(req, res, next) {
	var callback = function(results) {
		res.render('customers', { title: 'Customers', data:results});
	};
	dbService.getCustomers(callback);
});

//.   /customers/add
router.get('/add', function(req, res, next) {
  res.render('add-customer', { title: 'Add Customers'});
});

// /customers/edit
router.get('/edit/:id', function(req, res, next) {
  var callback = function(customer){
  	res.render('edit-customer', { title: 'Edit Customers', customer:customer});
  }
  var customerId = req.params.id; 
  var customer = dbService.getCustomerById(customerId,callback);
});

module.exports = router;
