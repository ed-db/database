/**
 * @module tools/validate
 * Export functions to validate magazine and article objects
 */

"use strict";

var path = require('path');
var fs = require('fs');
var Joi = require('joi');


/**
 * The validation schema for magazine object
 *
 * @static
 * @type {Joi.Object}
 */
var schemaMagazine = Joi.object().keys({
    date: Joi.date().iso().required(),
    displayed_date: Joi.string().required(),
    shop: Joi.string().uri().required(),
    number: Joi.number().integer().min(1).required(),
    type: Joi.string().required()
});


/**
 * The validation schema for article object
 *
 * @static
 * @type {Joi.Object}
 */
var schemaArticle = Joi.object().keys({
    id: Joi.string(),
    title: Joi.string().required(),
    author: Joi.string(),
    page: Joi.number().integer().min(1).required(),
    keywords: Joi.array().items(Joi.string()),
    description: Joi.string().required(),
    number: Joi.number().integer().min(1).required(),
    type: Joi.string().required(),
    date: Joi.date().iso().required(),
    url: Joi.string().uri().required()
});


/**
 * Validate a magazine object
 *
 * @param {Object} magazine : a magazine object
 * @param {string} filePath : full file path of the magazine YAML file
 * @throws will throws an error if the magazine object is invalid
 */
function validateMagazine(magazine, filePath) {
  // First validate the magazine object
  Joi.validate(magazine, schemaMagazine, function (err) {
    if (err === null) return;
    throw err.details[0].message + ' in magazine ' + JSON.stringify(doc);
  });

  // Then validate that there exists a magazine cover picture
  try {
    var dirName = path.dirname(filePath);
    var coverName = path.parse(filePath).name + '.jpg'; // filename of the cover file

    fs.lstatSync(path.join(dirName, coverName)); // Check that the cover picture exists
  }
  catch (e) {
    throw 'No png cover file ' + path.join(magazine.type, coverName);
  }
}


/**
 * Validate an article object
 *
 * @param {Object} article : an magazine object
 * @throws will throws an error if the magazine object is invalid
 */
function validateArticle(article) {
  // Validate the article
  Joi.validate(article, schemaArticle, function (err) {
    if (err === null) return;
    throw err.details[0].message + ' in article ' + JSON.stringify(doc);
  });
}


module.exports = {
  magazine: validateMagazine,
  article: validateArticle
}
