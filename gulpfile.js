var gulp = require('gulp');
var runSequence = require('run-sequence');
var merge = require('gulp-merge-json');
var build = require('./tools/build');


/**
 * Validate the content of all YAML file inside the data folder
 */
gulp.task('validate', function() {
  return build(); // The build task handle validation
});


/**
 * Aggregate the content of the YAML file inside a single JSON document
 */
gulp.task('build', function() {
  return build()
    .pipe(merge('articles.json', false, [], false, false, true))  // use feature concat array
    .pipe(gulp.dest('dist'));
});


/**
 * Build and deploy to github page site
 */
gulp.task('deploy', function() {
  return runSequence(
    'build'
  );
});


gulp.task('default', ['build']);
