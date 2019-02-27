
/*--------------------
  Dependencies
--------------------*/

const { watch } = require('gulp');
const { RoutesTask } = require('phusion-vue/dist/build/RoutesTask');

/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

const classmapFilePath = projectRoot + '/cache/classmap.js';
const outputFilePath = projectRoot + '/cache/routes.js';
const configFilePath = projectRoot + '/cache/config.js';
const routesWatchSrc = projectRoot + '/config/**/*';

/*-------------------------
  Task: routes:build
-------------------------*/

const task = new RoutesTask(
  {
    projectRootDirPath: projectRoot,
    classmapFilePath: classmapFilePath,
    outputFilePath: outputFilePath,
    configFilePath: configFilePath,
    routesConfigKeyPath: "phusion:routes"
  }
);

function routes()
{
  return new Promise(function(resolve, reject)
  {
    task.run();
    resolve();
  });
}

exports.routesTask = routes;


/*-------------------------
  Task: routes:watch
-------------------------*/

function routesWatch()
{
  return watch(routesWatchSrc, routes);
}

exports.routesWatchTask = routesWatch;
