/**
 * @module tools
 * Serve database file in a webserver for development purpose
 */

"use strict";

var path = require('path');
var express = require('express');
var cors = require('cors');
var argv = require('yargs')
    .default('host', 'localhost')
    .default('port', 8000)
    .argv
;

var server = express();
server.use(cors());
server.use(express.static(path.resolve(__dirname + '/../dist'), {
  setHeaders: function(res, path, stat) {
    if (path.endsWith('.json')) {
      res.set('Content-Type', 'application/json; charset=utf-8');
    }
  }
}));

module.exports = function() {
  var port = argv.port;
  var host = argv.host;
  return server.listen(port, host, function() {
    console.log('Server listening on http://' +  host + ':' +  port);
  });
}
