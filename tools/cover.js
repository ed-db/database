/**
 * @module tools
 * Get all cover files
 */

"use strict";

var gulp = require('gulp');
var path = require('path');
var data = require('gulp-data');
var debug = require('gulp-debug');
var sizeOf = require('image-size');

var VALID_HEIGHT = 600;
var VALID_WIDTH = 450;


module.exports = function() {
  return gulp
    .src('data/**/*.jpg')
    .pipe(data(function(file) {
      var dimensions = sizeOf(file.contents);
      if (dimensions.height !== VALID_HEIGHT || dimensions.width != VALID_WIDTH) {
        throw path.join(path.basename(path.dirname(file.path)), path.basename(file.path)) + ': Invalid size '
                + dimensions.width + 'x' + dimensions.height + '. Valid values are ' + VALID_WIDTH + 'x'
                + VALID_HEIGHT;
      }
      return file;
    }));
};
