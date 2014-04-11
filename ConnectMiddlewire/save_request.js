var fs = require('fs'),
path = require('path'),
util = require('util');

function save(dir) {
	console.log('Inside the save request');
	
	return function(req, res, next) {
				console.log('Inside the call Back \'+');
				var fileName = path.join( dir, Date.now().toString() + '_' +
										 Math.floor(Math.random() * 100000) + '.txt'
										);
				// Create the File Name created above and write with following req info
				var file = fs.createWriteStream(fileName);
					file.write(req.method + ' ' + req.url + '\n');
					file.write(util.inspect(req.headers) + '\n');
					//req.pipe(file);
					next();
			}
 }
 
 function test() {
	console.log('Declared after the Listining call');
}

module.exports.save = save;
module.exports.test = test;