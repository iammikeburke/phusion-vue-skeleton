
/*--------------------
  Dependencies
--------------------*/

const { dest, src, watch } = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

/*-------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

const imgSrc = projectRoot + '/assets/img/**/*.+(png|jpeg|jpg|gif)';
const imgDest = outputBuildDir + '/assets/img';


/*------------------------
  Task: imgMin:build
-------------------------*/

function imgMin()
{
  return src(imgSrc)
    .pipe(changed(imgDest))
    .pipe(
      imagemin({
          progressive: true,
          // set this if you are using svg images
          svgoPlugins: [{removeViewBox: false}],
          use:         [pngquant()],
          verbose: true
        }
      )
    )
    .pipe(dest(imgDest));
}

exports.imgMinTask = imgMin;


/*------------------------
  Task: imgMin:watch
-------------------------*/

function imgMinWatch()
{
  return watch(imgSrc, imgMin);
}

exports.imgMinWatchTask = imgMinWatch;