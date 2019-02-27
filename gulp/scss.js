
/*--------------------
  Dependencies
--------------------*/

const { dest, src, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');


/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

const scssSrcFilePath = projectRoot + '/assets/scss/app.scss';
const scssDestDirPath = outputBuildDir + '/assets/css';
const scssWatchSrc = projectRoot + '/assets/scss/**/*.scss';

/*--------------------
  Task: scss:build
--------------------*/

function scss()
{
  return src(scssSrcFilePath)
    // Initialize sourcemaps before compilation starts
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    // If production: Use postcss with autoprefixer and compress the compiled file using cssnano
    .pipe(gulpif((env === 'prod'), postcss([autoprefixer(), cssnano()])))
    // Now add/write the sourcemaps
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
     }))
    .pipe(dest(scssDestDirPath));
}

exports.scssTask = scss;


/*--------------------
  Task: scss:watch
--------------------*/

function scssWatch()
{
  watch(scssWatchSrc, scss);
}

exports.scssWatchTask = scssWatch;