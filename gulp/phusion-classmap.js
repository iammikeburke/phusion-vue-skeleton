
/*--------------------
  Dependencies
--------------------*/

const { watch } = require('gulp');
const { ClassmapTask } = require('phusion-vue/dist/build/ClassmapTask');

/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

const outputFilePath = projectRoot + '/cache/classmap.js';
const classmapWatchSrc = projectRoot + '/**/*.+(ts|json)';

/*-------------------------
  Task: config:build
-------------------------*/

const task = new ClassmapTask(
  {
    projectRootDirPath: projectRoot,
    outputFilePath: outputFilePath
  }
);

function classmap()
{
  return new Promise(function(resolve, reject)
  {
    task.run();
    resolve();
  });
}

exports.classmapTask = classmap;


/*-------------------------
  Task: config:watch
-------------------------*/

function classmapWatch()
{
  return watch(classmapWatchSrc, classmap);
}

exports.classmapWatchTask = classmapWatch;
