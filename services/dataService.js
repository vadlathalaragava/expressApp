var service = {};
var customerList = [
{id:1, name:'Vivek', email:'vivek@gmail.com', phone:'78787878', address:'India'},
{id:2, name:'Kamal', email:'kamal@gmail.com', phone:'9724232340', address:'Asia'}
];

service.getCustomers = function(){
	return customerList;
}

service.addCustomer = function(customer){
	customer.id = Math.round(Math.random()*1000000);
	customerList.push(customer);
}

service.deleteCustomer = function(customerId){
  var tempList=[];
  for(var i=0; i<customerList.length; i++ ){
  	if(customerId != customerList[i].id){
  		tempList.push(customerList[i]);
  	}
  }
  customerList = tempList;
}

service.updateCustomer = function(customer){
  for(var i=0; i<customerList.length; i++ ){
  	if(customer.id == customerList[i].id){
  		customerList[i] = customer;
  	}
  }
}

service.getCustomerById = function(customerId){
  var customer ={};
  for(var i=0; i<customerList.length; i++ ){
  	if(customerId == customerList[i].id){
  		customer = customerList[i];
  		break;
  	}
  }
  return customer;
}

module.exports = service;