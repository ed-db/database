/**
 * @module tools/build
 * Aggregate all articles from YAML into a JSON file
 */

var gulp = require('gulp');
var path = require('path');
var flatmap = require('gulp-flatmap');
var yaml = require('js-yaml');
var source = require('vinyl-source-stream');
var validate = require('./validate');


/**
 * Parse the content of a file, validate it and returns an array of article object
 *
 * @param {File} file : a gulp file vinyl object
 * @return Article[] : an array of article objects
 */
function parseFile(file) {
  var magazine; // Reference to first document of the YAML file describing the magazine
  var articles = []; // All articles object in the file

  var magazineNumber = path.basename(file.path, '.yml'); // filename without extension to get magazine number
  var magazineType = path.basename(path.dirname(file.path)); // Magazine type name from folder name

  var index = 0;
  yaml.safeLoadAll(file.contents.toString('utf8'), function (doc) {
    if (index === 0) { // First document in the YAML is the magazine
      // Enrich magazine information with data
      doc.type = magazineType;
      doc.number = parseInt(magazineNumber);
      magazine = doc; // keep reference to magazine to enrich article later

      validate.magazine(magazine, file.path); // Validate first doc describing the magazine
    } else {
      // Enrich article with information from magazine
      doc.date = magazine.date;
      doc.number = magazine.number;
      doc.type = magazine.type;

      validate.article(doc); // Validate article information

      articles.push(doc);
    }

    index++;
  });

  return articles;
}


module.exports = function() {
  var articles = [];

  return gulp
    .src('data/**/*.yml')
    .pipe(flatmap(function(stream, file) {
      try {
        articles = articles.concat(parseFile(file));
      }
      catch(e) {
        throw path.join(path.basename(path.dirname(file.path)), path.basename(file.path)) + ': ' + e
      }

      var stream = source('articles.json');
      stream.end(JSON.stringify(articles));
      return stream;
    }));
};
