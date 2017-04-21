var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

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
      fs.readFile(archive.paths.archivedSites + asset, function (err, data) {
        if (err) {
          callback ? callback() : exports.handle404(res);
        } else {
          exports.handleGetRequest(res, null, data);
        }
      })
    } else {
      exports.handleGetRequest(res, null, data);
    }
  })
}

exports.handleGetRequest = (res, status, obj) => {
  status = status || 200;
  res.writeHead(status, exports.headers);
  res.end(obj);
  
  

  // var isListed = archive.isUrlInList(path.list, function(bool) {
  //   return bool;
  // })
  // if (isListed) {
  //   //Call serveAssets
  // } else {
  //     status = status || 404;
  //     res.end();
  // }
}

exports.handlePostRequest = (res, status, urlEnd) => {
  status = status || 302;
  res.writeHead(status, {Location: urlEnd});
  res.end();
}

exports.handle404 = (res) => {
  exports.handleGetRequest(res, 404, '404: Page not found');
}

exports.dataCollection = (req, callback) => {
  var data = "";
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    callback(data);
  })
}
// As you progress, keep thinking about what helper functions you can put here!
