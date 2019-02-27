
/*--------------------
  Dependencies
--------------------*/

const { dest, src, watch } = require('gulp');


/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

const copySrc = projectRoot + '/assets/fonts/**/*';
const copyDest = outputBuildDir + '/assets/fonts';

/*--------------------
  Task: copy:build
--------------------*/

function copy()
{
  return src(copySrc)
    .pipe(dest(copyDest));
}

exports.copyTask = copy;

/*--------------------
  Task: copy:watch
--------------------*/

function copyWatch()
{
  return watch(copySrc, copy);
}

exports.copyWatchTask = copyWatch;
