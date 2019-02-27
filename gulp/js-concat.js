
/*--------------------
  Dependencies
--------------------*/

const { dest, src } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

var jsFilesToConcat = [
  // './node_modules/jquery/dist/jquery.min.js',
  './node_modules/vue/dist/vue.js'
];

var jsConcatOutputFileName = 'external.min.js';
var jsConcatOutputDirectory = outputBuildDir + '/assets/js/';


/*--------------------
  Task: jsUglify
--------------------*/

function jsConcat()
{
  return src(jsFilesToConcat)
    .pipe(concat(jsConcatOutputFileName))
    .pipe(uglify())
    .pipe(dest(jsConcatOutputDirectory));
}

exports.jsConcatTask = jsConcat;
