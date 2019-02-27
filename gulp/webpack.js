
/*--------------------
  Dependencies
--------------------*/

const { dest, src, watch } = require('gulp');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');


/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

const webpackSrc = projectRoot + '/index.ts';
const webpackDest = outputBuildDir + '/assets/js';


/*-------------------------
  Task: webpack:build
-------------------------*/

function webpack()
{
  const webpackConfig = require(projectRoot + '/webpack.config.js');
  webpackConfig.watch = false;

  return runWebpack(webpackConfig);
}

exports.webpackTask = webpack;


function webpackWatch()
{
  const webpackConfig = require(projectRoot + '/webpack.config.js');
  webpackConfig.watch = true;

  return runWebpack(webpackConfig);
}

exports.webpackWatchTask = webpackWatch;

/* Non-exported functions */
function runWebpack(webpackConfig)
{
  return src(webpackSrc)
    .pipe(named())
    .pipe(webpackStream(webpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(dest(webpackDest));
}