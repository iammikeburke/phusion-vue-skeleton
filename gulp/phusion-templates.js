
/*--------------------
  Dependencies
--------------------*/

const { watch } = require('gulp');
const { TemplatesTask } = require('phusion-vue/dist/build/TemplatesTask');

/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

const classmapFilePath = projectRoot + '/cache/classmap.js';
const outputFilePath = projectRoot + '/cache/templates.js';
const viewCacheWatchSrc = projectRoot + '/**/*.+(html)';

/*------------------------------
  Task: cacheTemplates:build
-------------------------------*/

const task = new TemplatesTask(
  {
    projectRootDirPath: projectRoot,
    classmapFilePath: classmapFilePath,
    outputFilePath: outputFilePath
  }
);

function templates()
{
  return new Promise(function(resolve, reject)
  {
    task.run();
    resolve();
  });
}

exports.templatesTask = templates;


/*------------------------------
  Task: cacheTemplates:watch
------------------------------*/

function cacheTemplatesWatch()
{
  return watch(viewCacheWatchSrc, templates);
}

exports.templatesWatchTask = cacheTemplatesWatch;
