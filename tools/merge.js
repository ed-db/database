/**
 * This is a light modification of gulp-concat-json
 * https://github.com/Itrulia/gulp-concat-json
 *
 * Instead of pushing to the global array, we concat it
 *
 * Copyright 2014 Eli Yukelzon
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

"use strict";

var through = require('through');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;

module.exports = function (fileName) {
  if (!fileName) {
    throw new PluginError('gulp-concat-json', 'Missing fileName option for gulp-concat-json');
  }

  var data = [];
  var firstFile = null;

  function bufferContents(file) {
    if (!firstFile) {
      firstFile = file;
    }

    if (file.isNull()) {
      return; // ignore
    }
    if (file.isStream()) {
      return this.emit('error', new PluginError('gulp-concat-json', 'Streaming not supported'));
    }

    data = data.concat(JSON.parse(file.contents.toString()));
  }

  function endStream() {
    var joinedPath = path.join(firstFile.base, fileName);

    var joinedFile = new File({
      cwd: firstFile.cwd,
      base: firstFile.base,
      path: joinedPath,
      contents: new Buffer(JSON.stringify(data))
    });

    this.emit('data', joinedFile);
    this.emit('end');
  }

  return through(bufferContents, endStream);
};
