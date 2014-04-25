/*
* User Routes all of this methods Request taken from the views/index.jade and display the Outputs
 In this Example the data is fetched from a JSON file and the Output is displayed This will be removed 
 by a MongoDB out put which is also a JSON 
*/
var users = require('../data/user');
var expressValidator = require('express-validator'); // Need to install this 

module.exports = function(app) {

  app.get('/users', function(req, res){
		console.log("DEBUG:/GET/USERS:Inside the user List in router This is Suppose to Render Views from /views/user/index");
		console.log("DEBUG:/GET/USERS:json Object is " + require('util').inspect(users, {depth:null}));
		res.render('users/index', {title: 'Users', users: users});
  });

  app.get('/users/new', function(req, res) {
	console.log("DEBUG:/GET/NEW: Inside new function ");
	res.render('users/new', {title: "New User"});
  });


  app.get('/users/:name', function(req, res, next){
	console.log("DEBUG:/GET/USERSNAME: Inside the users name in router ");
	var user = users[req.params.name];
	// this will print the JSON object 
	console.log("DEBUG:/GET/USERSNAME: json Object is \n " + require('util').inspect(user, {depth:null}));
	if (user) {
		res.render('users/profile', {title: 'User profile', user: user});
	} 
	else {
		next();
	}
  });


  app.post('/users', function(req, res) {
	console.log("DEBUG:/POST/USERS: Called post for New user Submission ");
	console.log(req.body);
	//req.assert('username', 'Please enter a name').notEmpty();
   
	
	if (users[req.body.username]) {
		console.log("DEBUG:/POST/USERS:  Checking the New user in the List for new User Submission");
		res.send('Conflict', 409);
	} 
	else{
		users[req.body.username] = req.body;
		console.log("DEBUG:/POST/USERS: User is a New One so Lets redirect to localhost/users");
		res.redirect('/users');
	}
	
  });


  app.del('/users/:name', function(req, res, next) {
	console.log("Inside the delete in router");
	if (users[req.params.name]) {
		delete users[req.params.name];
		res.redirect('/users');
	} 
	else
	{
		next();
	}
  });

};