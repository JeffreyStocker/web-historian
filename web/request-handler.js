var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers.js');
var urlModule = require ('url');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.info ('------------Request Start----------');
  var filePath = __dirname + '/public' + req.url;
  // var filePath = archive.paths.siteAssets + req.url;

  // if (req.url === '/') {
  //   console.log ('/');
  // }
  // console.log('Method:', req.method);
  // database  = {site : 'name ', stataus: 'need to load ' or 'saved'}
  if (req.url === '/') {
    //load index file.
    filePath = archive.paths.siteAssets + '/index.html';
  }


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
      } catch (error) { console.log('Error with JSON parsing'); } 

      var url = body.slice(body.indexOf('=') + 1);

      archive.isUrlArchived(url, function(isArchived) {
        console.log('URL:', url);
        if (isArchived === false) { //show loading page,
          filePath = __dirname + '/public/loading.html';
          exports.readHTMLFiles(filePath, function (data) {
            res.writeHead(201, helpers.headers);
            res.write(data);
            res.end();
          });
          //write the url to the sites.txt file...
          archive.addUrlToList(url, function(error, isSuccess) {
            console.log('Adding URL to sites.txt, Success:', isSuccess);
          });
        } else if (isArchived === true) {
          console.log('Archive Found');
          exports.readHTMLFiles(archive.paths.archivedSites + '/' + url, function(data) {
            res.writeHead(302, helpers.headers);
            res.write(data);
            res.end();
          });
        }
      });
    });
  } else if (req.method === 'GET') {
    console.log ('This is a GET');
    console.log(filePath);
    exports.readHTMLFiles(filePath, (error, data) => {
      if (error) {
        res.writeHead(404, helpers.headers);
        // console.error ('Error: Can not Find File');
        // res.write(data);
        res.end();
        return;
      }
      res.writeHead(200, helpers.headers);
      res.write(data);
      res.end();
      return;
    });
  } else {
    console.log ('Request is not a GET or POST. YOU NEED TO FIX!!\n', req.url);

  }
};


exports.readHTMLFiles = function (filePath, callback) {
  fs.readFile (filePath, (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, data);
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