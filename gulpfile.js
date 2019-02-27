
/*--------------------
  Dependencies
--------------------*/

const { series, parallel } = require('gulp');

/*--------------------
  Set global vars
--------------------*/

// If there is no ENV set, default to dev
if (!process.env['ENV']) process.env['ENV'] = 'dev';
// Set project root directory path
process.env['PROJECT_ROOT_DIR'] = process.cwd();
// Set output build directory path
process.env['OUTPUT_BUILD_DIR'] = __dirname + '/public';


/*--------------------
  Define tasks
--------------------*/

// Build tasks
const { classmapTask, classmapWatchTask } = require('./gulp/phusion-classmap');
const { configTask, configWatchTask } = require('./gulp/phusion-config');
const { copyTask, copyWatchTask } = require('./gulp/copy');
const { serveTask } = require('./gulp/phusion-serve');
const { imgMinTask, imgMinWatchTask } = require('./gulp/img-min');
const { jsConcatTask } = require('./gulp/js-concat');
const { jsUglifyTask, jsUglifyWatchTask } = require('./gulp/js-uglify');
const { routesTask, routesWatchTask } = require('./gulp/phusion-routes');
const { scssTask, scssWatchTask } = require('./gulp/scss');
const { templatesTask, templatesWatchTask } = require('./gulp/phusion-templates');
const { webpackTask, webpackWatchTask } = require('./gulp/webpack');

// Alias tasks
const buildTask = parallel(
  series(
    configTask,
    classmapTask,
    templatesTask, // Requires classmap to be output first
    routesTask, // Requires config and classmap to be output first
    webpackTask // Requires output from all of the above
  ),
  copyTask,
  imgMinTask,
  jsConcatTask,
  jsUglifyTask,
  scssTask
);

const watchTask = parallel(
  classmapWatchTask,
  configWatchTask,
  copyWatchTask,
  imgMinWatchTask,
  jsUglifyWatchTask,
  routesWatchTask,
  scssWatchTask,
  templatesWatchTask,
  webpackWatchTask
);
const defaultTask = series(buildTask, parallel(watchTask, serveTask));


/*--------------------
  Export tasks
--------------------*/

// Build tasks
exports.classmap = classmapTask;            // Scan project and generate map of classes and file paths
exports.config = configTask;                // Merge config files
exports.copy = copyTask;                    // Copy
exports.serve = serveTask;                  // Start dev server
exports.imgMin = imgMinTask;                // Compress images
exports.jsConcat = jsConcatTask;            // Concatenate & uglify JavaScript files
exports.jsUglify = jsUglifyTask;            // Uglify JavaScript files
exports.routes = routesTask;                // Build routes file
exports.scss = scssTask;                    // Compile SCSS
exports.templates = templatesTask;          // Cache views for all components in the class map
exports.webpack = webpackTask;              // Run webpack

// Watch tasks
exports.watch = watchTask;                  // Run all watch tasks
exports.classmapWatch = classmapWatchTask;  // Watch for component changes
exports.configWatch = configWatchTask;      // Watch for config file changes
exports.copyWatch = copyWatchTask;          // Watch for files that need to be copied
exports.imgMinWatch = imgMinWatchTask;      // Watch for changes to img dir
exports.jsUglifyWatch = jsUglifyWatchTask;  // Watch js changes
exports.scssWatch = scssWatchTask;          // Watch for scss changes
exports.routesWatch = routesWatchTask;      // Watch for config changes
exports.templatesWatch = templatesWatchTask;// Watch for html changes
exports.webpackWatch = webpackWatchTask;    // Run webpack

// Alias tasks
exports.build = buildTask;                  // Run all build tasks
exports.default = defaultTask;              // Run all build tasks then watch for changes
