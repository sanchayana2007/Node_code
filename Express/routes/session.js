/*
* Session Routes
here it shows another method of rendering the views 
*/
var users = require('../data/user');
module.exports = function(app) {
	
	app.get('/session/new', function(req, res) {
		console.log("DEBUG:/GET/SESSION_NEW:Inside session This will Render Views from /views/session/new");
		res.render('session/new', {title: "Log in" ,session: req.session});

	});
	
	app.get('/session/user', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('session/user', {title: "Log in" ,session: req.session});

	});
	app.post('/session', function(req, res) {
		console.log("DEBUG:/POST/SESSION:Check the Request and password");
		if (users[req.body.username] && users[req.body.username].password === req.body.password) {
			console.log("DEBUG:/POST/SESSION:User and password MATCHED");
			req.session.user = users[req.body.username];
			res.redirect('/users');
		} 
		else 
		{
			console.log("DEBUG:/POST/SESSION:User and password mismatched or Login Used by someone");
			res.redirect('/session/new')
		}
	});
	
	app.del('/session', function(req, res, next) {
		console.log("DEBUG:/DEL/SESSION: Logout should be present");
		req.session.destroy();
		res.redirect('/users');
	});
};