// Async task (same in all examples in this chapter)
function async(arg, callback)
{
 console.log('Inside async');
 console.log('do something with \''+arg+'\', return 1 sec later');
  setTimeout(function() { callback(arg * 2); }, 1000);
}
// Final task (same in all the examples)
function final() { console.log('Done', results); }

// A simple async series:
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
function series(item) 
{
	 console.log('In The Function Series');
  if(item) {
			console.log('Calling async function with argument');
			async( item, function(result) {
				console.log('Inside Callback function');
				results.push(result);
				return series(items.shift());
		});
  } else {
    return final();
  }
}

series(items.shift());