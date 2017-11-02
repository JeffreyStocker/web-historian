var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers.js');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.info ('------------Request Start----------');
  var filePath = __dirname + '/public' + req.url;
  // if (req.url === '/') {
  //   console.log ('/');
  // }
  // console.log('Method:', req.method);
  // database  = {site : 'name ', stataus: 'need to load ' or 'saved'}
  if (req.method === 'POST') {
    var body = '';
    console.log ('This is a POST');
    // var content = req.url;
    // console.log ('content', content);
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on ('end', () => {
      console.log ('body', body);
      try {
        body = JSON.parse(body);
        console.log ('JSON body', body);
      } catch (error) {
      }
      var url = body.slice(body.indexOf('=') + 1);
      // console.log ('url', url);
      archive.isUrlArchived(url, function(isArchived) {
        // console.log (isArchived);
        if (isArchived === false) {
          filePath = __dirname + '/public/loading.html';
        }
        /// call file get help and now enter callback hell
        exports.readHTMLFiles(filePath, function (data) {
          res.writeHead(201, helpers.headers);
          res.write(data);
          res.end();
        });
      });
    });
  } else if (req.method === 'GET') {
    console.log ('This is a GET');
    exports.readHTMLFiles(filePath, (data) => {
      res.writeHead(200, helpers.headers);
      res.write(data);
      res.end();
    });
  } else {
    console.log ('Request is not a GET or POST. YOU NEED TO FIX!!\n', req.url);
  }
};


exports.readHTMLFiles = function (filePath, callback) {
  fs.readFile (filePath, (error, data) => {
    if (error) {
      console.log (error);
      return;
    }
    callback(data);
  });
};

//WIP
exports.sendReply = function (replay, state) {
  res.writeHead(200, helpers.headers);

  res.write(data);
  res.end();
};

// ///////original/////////
// var path = require('path');
// var archive = require('../helpers/archive-helpers');
// // require more modules/folders here!

// exports.handleRequest = function (req, res) {
//   res.end(archive.paths.list);
// };