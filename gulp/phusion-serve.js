
/*--------------------
  Dependencies
--------------------*/

const { DevServerTask } = require('phusion/dist/build/DevServerTask');

/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

/*-------------------------
  Task: devServer
-------------------------*/

/*
  host:
    Uncomment the "host" option below and add "127.0.0.1 www.example.local example.local"
    to your hosts file to allow you to access "example.local" in the browser.

  open:
    If you've added your own host e.g. example.local, uncomment the "open" option
    below if you want that host to be the default URL that opens in the browser when
    the server is running.
*/

const devServerTask = new DevServerTask(
  {
    browserSyncConfig: {
      host: 'example.local',
      open: 'external',
      serveStatic: [ outputBuildDir ],
      watch: [ outputBuildDir + '/**/*' ]
    }
  }
);

function serve()
{
  return new Promise(function(resolve, reject)
  {
    devServerTask.run();
    resolve();
  });
}

exports.serveTask = serve;
