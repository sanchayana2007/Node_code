/*
Here No Create Server is not Used instead we use ".use" to call the 
methods provided by the connect middle wire 

*/

var connect = require('connect');
// This will create the server 
var app = connect();
console.log("Srever is created ");

/************Callbacks**************/

// Setup logger middleware simple
	app.use(connect.logger("All use will be callbacks  Now little detailed Logger for breaking the response fields ")); // logger(tiny/short)
	var RespLogFormat = 'Header -  :method -  Status :status  Date -s :date  URL :url - Remaddr:remote-addr';
	app.use(connect.logger(RespLogFormat));

// SetUp the static path for ImGES http://localhost:8080/pic.png
	app.use(connect.static(__dirname + '/public'));
	
// Set Up the coooki parser Middle wire 
	app.use(connect.bodyParser());

// Setup for parsing Cookies curl -b 'a=b; c=d' http://localhost:8080{"a":"b","c":"d"}
	app.use(connect.cookieParser());

// Set Up the REQ/RES middle wire 
	app.use(function(req, res) {
		res.end('Hello World!');
		//http://localhost:8080/?a=b&c=d, convert the JSON in String as Key valuees Key : Value
		
		res.end(JSON.stringify(req.query));
		// the req.cookies  will have parsed values 
		res.end(JSON.stringify(req.cookies));
	});



	app.listen(8080);