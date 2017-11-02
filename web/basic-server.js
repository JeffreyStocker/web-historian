var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

var test = require('../helpers/archive-helpers.js');
// test.addUrlToList('testing.com', function() {
//   console.log("in callback");
//   test.isUrlInList('testing.com', (status) => (console.log ('status:', status)));
// });
// test.isUrlInList('example12.com', (status) => (console.log (status)));
// test.downloadUrls();


/////////// original ///////////
// var http = require('http');
// var handler = require('./request-handler');
// var initialize = require('./initialize.js');

// // Why do you think we have this here?
// // HINT: It has to do with what's in .gitignore
// initialize('./archives');

// var port = 8080;
// var ip = '127.0.0.1';
// var server = http.createServer(handler.handleRequest);

// if (module.parent) {
//   module.exports = server;
// } else {
//   server.listen(port, ip);
//   console.log('Listening on http://' + ip + ':' + port);
// }

