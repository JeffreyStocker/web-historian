// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

//want to use 

var helpers = require('../helpers/archive-helpers.js');

var htmlFetcher = function() {
  //read the sites.txt and downlaods all the sites in it...
  helpers.readListOfUrls(function(listOfUrls) {
    helpers.downloadUrls(listOfUrls);
  });

  //clear the sites.txt files, since we already downloaded all of them
};

