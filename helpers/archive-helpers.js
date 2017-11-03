var fs = require('fs');
var path = require('path');
var _ = require('underscore');
// var process = require('process'); //process.cwd() to find the root directory of out code
var urlModule = require('url');
var https = require('https');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var encoding = 'utf8';
exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback = ()=>{}) {
  //open file sites.txt
  // extract data
  // go through each of the objects use the callback on each one
  
  // var filePath = process.cwd() + '/archives/sites.txt';

  fs.readFile (exports.paths.list, encoding, (error, data) => {
    if (error) {
      console.log (error);
      return;
    }
    var database = data === '' ? [] : data.split('\n');
    if (database[0] === '') { database.shift(); }
    if (database[database.length - 1] === '') { database.pop(); }
    // console.log ('database', database);
    callback (database);
    return;
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function (urls) {
    callback (urls.includes(url));
  });
};

exports.addUrlToList = function(url, callback = () =>{} ) {
  //grabbing information
  //storing in a object
  //add new url to the object w/ status 'inprogress'
  //store back to the harddrive
  var database;
  console.log ('is running');
  exports.readListOfUrls(function(urls) {
    database = urls;
    exports.isUrlInList(url, function (status) {
      if (status === false) {
        // console.log("URL:", url);
        database.push(url);
        // console.log("database:", database);
        // console.log("database text:", database.join('\n'));
        fs.writeFile (exports.paths.list, database.join('\n'), (error) => {
          if (error) {
            callback (error, false);
          }
          // console.log (url, 'saved to sites.txt');
          callback(null, true);
        });
      }
    });
  });
};


exports.isUrlArchived = function(url, callback) {
  /// check if the URL is in the site.txt
  // because we have an object, check if status is 'saved'
  //return true/false depending of status
  fs.readFile (exports.paths.archivedSites + '/' + url, (error, data) => {
    if (error) {
      callback(false);
      return;
    }
    callback(true);
    return;
  });
};

exports.downloadUrls = function(urls = ['one']) {
  // this one is going to be a pain
  // all this one is going to do is inial anouther to download
  //use readListOfUrls
  // if specific url is 'inprogress'
    //magicaly download it into the sites folder
    //changed the status of the url
  //done magically!
  for (var i = 0; i < urls.length; i++ ) {
    var currentUrl = urls[i];
    // currentUrl = 'www.google.com';
    https.get({host: currentUrl}, function (res) {
      // res.setEncoding('utf8');
      // console.log ('test');
      let body = '';
      res.on('data', function (data) {
        body += data;
        // console.log ('adding to body');
      });
      res.on('end', function () {        
        //write body to => 'exports.paths.archivedSites/' + currentUrl

        fs.open(exports.paths.archivedSites + '/' + currentUrl, 'w', function (err, fd) {
          fs.write (fd, body, (error) => {
            if (error) {
              console.error (error);
              return;
            }
            fs.close(fd);
          });
        });
      });
    });
  }

};



////////////////////// first try/////////////////////
// used an object as the holder for information

// exports.readListOfUrls = function(callback = ()=>{}) {
//   //open file sites.txt
//   // extract data
//   // go through each of the objects use the callback on each one
  
//   var filePath = process.cwd() + '/archives/sites.txt';
//   fs.readFile (filePath, (error, data) => {
//     if (error) {
//       console.log (error);
//       return;
//     }
//     var database = JSON.parse(data);
//     // console.log ('database', typeof database);

//     var sites = Object.keys(database);
//     for (var site of sites) {
//       callback(database[site]);
//     }
//     return;
//   });
// };


// //helper function to get database--- BUT
// //we were going into callback hell and quickly
// exports.getSitesTxtData = function () {
//   var database;
//   var filePath = process.cwd() + '/archives/sites.txt';
//   fs.readFile (filePath, (error, data) => {
//     if (error) {
//       console.log (error);
//       return;
//     }
//     database = JSON.parse(data);
//     return;
//   });
// };

// exports.isUrlInList = function(url, callback) {
//   /// check if the URL is in the site.txt
//   // because we have an object, we can directly check if a property exists
//   //return true/false
//   var state;
//   var database;
//   var filePath = process.cwd() + '/archives/sites.txt';
//   fs.readFile (filePath, (error, data) => {
//     if (error) {
//       console.log (error);
//       return;
//     }
//     database = JSON.parse(data);
//     state = database[url] ? true : false;
//     callback (state);
//     return;
//   });
// };


// createSiteName = function (url) {
//   if (url.indexOf('http://') === -1 || url.indexOf('https://') === -1) {
//     url = 'http://' + url;
//   }
//   var smallurl = urlModule.parse(url);
//   console.log ('test', smallurl);
//   // siteValue.href = url;
//   var obj = {
//     site: smallurl.hostname, // prococes this
//     fullUrl: url,
//     status: 'inprocess', 
//     location: null
//   };
//   return obj;
// };

// exports.addUrlToList = function(url, callback) {
//   //grabbing information
//   //storing in a object
//   //add new url to the object w/ status 'inprogress'
//   //store back to the harddrive
//   var filePath = process.cwd() + '/archives/sites.txt';
//   fs.readFile (filePath, (error, data) => {
//     if (error) {
//       console.log (error);
//       return;
//     }
//     var database = JSON.parse(data);
//     database[url] = createSiteName(url);
//     //write to file...
//     fs.writeFile (filePath, JSON.stringify(database), (error) => {
//       if (error) {
//         console.error (error);
//       }
//     });
//   });
// };


// exports.isUrlArchived = function(url, callback) {
//   /// check if the URL is in the site.txt
//   // because we have an object, check if status is 'saved'
//   //return true/false depending of status

//   var database;
//   var filePath = process.cwd() + '/archives/sites.txt';
//   fs.readFile (filePath, (error, data) => {
//     if (error) {
//       console.log (error);
//       return;
//     }
//     database = JSON.parse(data);
//     isThere = database.hasOwnProperty(url);
//     callback(isThere);
//     return;
//   });
// };

// exports.downloadUrls = function(urls) {
//   // this one is going to be a pain
//   // all this one is going to do is inial anouther to download
//   //use readListOfUrls
//   // if specific url is 'inprogress'
//     //magicaly download it into the sites folder
//     //changed the status of the url
//   //done magically!
// };




///////////// original/////////////
// var fs = require('fs');
// var path = require('path');
// var _ = require('underscore');

// /*
//  * You will need to reuse the same paths many times over in the course of this sprint.
//  * Consider using the `paths` object below to store frequently used file paths. This way,
//  * if you move any files, you'll only need to change your code in one place! Feel free to
//  * customize it in any way you wish.
//  */

// exports.paths = {
//   siteAssets: path.join(__dirname, '../web/public'),
//   archivedSites: path.join(__dirname, '../archives/sites'),
//   list: path.join(__dirname, '../archives/sites.txt')
// };

// // Used for stubbing paths for tests, do not modify
// exports.initialize = function(pathsObj) {
//   _.each(pathsObj, function(path, type) {
//     exports.paths[type] = path;
//   });
// };

// // The following function names are provided to you to suggest how you might
// // modularize your code. Keep it clean!

// exports.readListOfUrls = function(callback) {
// };

// exports.isUrlInList = function(url, callback) {
// };

// exports.addUrlToList = function(url, callback) {
// };

// exports.isUrlArchived = function(url, callback) {
// };

// exports.downloadUrls = function(urls) {
// };
