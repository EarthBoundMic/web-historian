var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('../web/http-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

var actions = {
  'GET': helpers.handleGetRequest,
  'POST': helpers.handlePostRequest
}

exports.handleRequest = function (req, res) {
  
  // console.log(req.url)
  // var handleGetRequest = () => {
    
  // }
  var action = actions[req.method];
  if(action) {  
    if(req.method === "GET") {
      var pathName = url.parse(req.url).pathname;
      if(pathName === "/") {
        helpers.serveAssets(res, "/index.html");
      } else {
        pathName = pathName.slice(1);
        archive.addUrltoList(pathName, function () {
          helpers.handleGetRequest(res, 404);
        })
      }
      
    }
  }
};
