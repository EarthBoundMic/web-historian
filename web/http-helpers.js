var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var uhh = this;
exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  fs.readFile(archive.paths.siteAssets + asset, function (err, data) {
    if (err) {
        uhh.handleGetRequest(res, 404);
    } else {
      console.log("Assets: ". data);
      uhh.handleGetRequest(res, null, data);
    }
  });
}

exports.handleGetRequest = (res, status, obj) => {
  status = status || 200;
  res.writeHead(status, uhh.headers);
  res.end(obj);
}

exports.handlePostRequest = (res, status, obj) => {
  status = status || 302;
  fs.appendFile(archive.paths.list, obj);
  res.writeHead(status, uhh.headers);
  res.end(JSON.stringify(obj));
}

// As you progress, keep thinking about what helper functions you can put here!
