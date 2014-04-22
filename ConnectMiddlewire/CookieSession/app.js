var connect = require('connect');
var format = require('util').format;
var app = connect();
console.log("Srever is created ");
// setup middleware
app.use(connect.query());
/************Callbacks**************/

// Setup logger middleware simple
	app.use(connect.logger("All use will be callbacks  Now little detailed Logger for breaking the response fields ")); // logger(tiny/short)
	var RespLogFormat = 'Header -  :method -  Status :status  Date -s :date  URL :url - Remaddr:remote-addr';
	app.use(connect.logger(RespLogFormat));
/*
The Below data will be saved by the browser 
	cookieParser : Body of the Cookie this info is encoded and saved 
	session : this Info is header for the cookie shows the Max time the above Info is stored 
*/	
	app.use(connect.cookieParser('this is my secret string'));
	app.use(connect.session({
		cookie: { maxAge: 24 * 60 * 60 * 1000 }
	}));

// actually respond
	app.use(function(req, res) {
// In the Response of GET the server will display the Session maintained Information . We will Loop through every atribute in the 
// REQ and copy it in the session 
	
	for (var name in req.query) {
		// Req.session[atribute] = req.query[atribute]
		req.session[name] = req.query[name];
	}
	/* In the End format the response is shown up with formated cookies
		{ cookie: 
			{ path: '/',
			  _expires: Wed Apr 23 2014 16:21:03 GMT+0530 (India Standard Time),
			  originalMaxAge: 86400000,
			  httpOnly: true 
			},
		  c: 'd' // This is a Value will be taken from the request  http://localhost:8080/?c=d 
		 }
	any further add ons of the values will result in Adding the cookies at the End
	*/
		res.end(format(req.session) + '\n');
	});
	app.listen(8080);