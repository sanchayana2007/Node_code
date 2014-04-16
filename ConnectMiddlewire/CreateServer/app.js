var connect = require('connect')
var sv_req = require ('./save_request')

//Create an App Server and Call up the Create Server
// with a Call back sv_req which will perform  
var Server = connect.createServer(

sv_req.save(__dirname )
);

// Using Up the Connect middle wire utilities , which can be done using the Constructor call
conectmw = connect();
conectmw.use(connect.logger());

console.log('Server Addition is done');
Server.listen(8080);

