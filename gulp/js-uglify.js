
/*--------------------
  Dependencies
--------------------*/

const { dest, src, watch  } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

const jsUglifySrc = projectRoot + '/assets/js/**/*.js';
const jsUglifyDest = outputBuildDir + '/assets/js';


/*-------------------------
  Task: jsUglify:build
-------------------------*/

function jsUglify()
{
  return src([ jsUglifySrc ])
    .pipe(uglify())
    .pipe(rename({
       suffix: '.min'
     }))
    .pipe(dest(jsUglifyDest));
}

exports.jsUglifyTask = jsUglify;


/*-------------------------
  Task: jsUglify:watch
-------------------------*/

function jsUglifyWatch()
{
  return watch(jsUglifySrc, jsUglify);
}

exports.jsUglifyWatchTask = jsUglifyWatch;
