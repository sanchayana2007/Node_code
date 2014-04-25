/**
* Module dependencies.
*/
var express = require('express')
var routes = require('./routes');
var app  = express();

// Express Configuration
app.configure(function(){
		//Set the View Dir and rendering engine
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		// Express used the Following Middle wire (parser, methodOveride(to Use , DEL, PUT ))
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		//Session maintainence stuffs
		app.use(express.cookieParser('my secret string'));
		app.use(express.session({
				secret: 'my secret string',
				maxAge: 3600000
		}));
		// Express Uses router middle wire to map all the request to proper Listener
		app.use(app.router);
		// all the static data should be kept in this 
		app.use(express.static(__dirname + '/public'));
		app.use(function(req, res, next){
			var session = req.session;
			next();
		});
});

// App configure having Two seperate Enviroment 
// Use : $ NODE_ENV=production node app


app.configure('development', function(){
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
app.use(express.errorHandler());
});
// Routes are separeted and kept in a different route folder having the GET/POSTs
//app.get('/', routes.index);
require('./routes/index')(app);
require('./routes/user')(app);
require('./routes/session')(app);
app.listen(3000, function(){
console.log("Express server listening on port %d in %s mode", app.port,
app.settings.env);
});