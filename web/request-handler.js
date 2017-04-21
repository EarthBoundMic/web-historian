var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('../web/http-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

var actions = {
  'GET': (req, res) => { 
    if(req.method === "GET") {
      var pathName = url.parse(req.url).pathname;
      if(pathName === "/") { pathName = "/index.html"; }
        helpers.serveAssets(res, pathName, function() {
        if (pathName[0] === "/") {
          pathName = pathName.slice(1);
        }
        archive.isUrlInList(pathName, function(bool) {
          if (bool) {
            helpers.handlePostRequest(res, 302, '/loading.html');
          } else {
            helpers.handle404(res);
          }
        })
      })
    }
  },
  'POST': (req, res) => {
    if (req.method === "POST") {
    helpers.dataCollection(req, function(data){
      var pathName = data.toString().split('=')[1].replace('http://', '');
        archive.isUrlInList(pathName, function(bool) {
          if (bool) {
            archive.isUrlArchived(pathName, function(isIt) {
              if (isIt) {
                helpers.handlePostRequest(res, null, pathName);
              } else {
                helpers.handlePostRequest(res, null, "/loading.html");
              }
            })
          } else {
            archive.addUrlToList(pathName, function() {
              helpers.handlePostRequest(res, null, "/loading.html");
            })
          }
        })
      })
    }
  }
}

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    helpers.handle404(res);
  }
  
  // console.log(req.url)
  // var handleGetRequest = () => {
    
  // }
};
