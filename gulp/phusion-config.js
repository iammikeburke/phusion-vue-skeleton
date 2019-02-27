
/*--------------------
  Dependencies
--------------------*/

const { watch } = require('gulp');
const { ConfigTask } = require('../node_modules/phusion/dist/build/ConfigTask');

/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

const configDirPath = projectRoot + '/config';
const configOutputFile = projectRoot + "/cache/config.js";
const configWatchSrc = projectRoot + '/**/*.+(ts|json)';


/*-------------------------
  Task: config:build
-------------------------*/

const task = new ConfigTask(
  {
    configDirPath: configDirPath,
    outputFilePath: configOutputFile,
    outputFormat: "node"
  }
);

function config()
{
  return new Promise(function(resolve, reject)
  {
    task.run();
    resolve();
  });
}

exports.configTask = config;


/*-------------------------
  Task: config:watch
-------------------------*/

function configWatch()
{
  return watch(configWatchSrc, config);
}

exports.configWatchTask = configWatch;
