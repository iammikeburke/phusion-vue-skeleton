# phusion-vue-skeleton

This repository is a skeleton project for building SPAs using [`phusion-vue`](https://github.com/iammikeburke/phusion-vue) and [`phusion`](https://github.com/iammikeburke/phusion). It provides a gulpfile (Gulp 4) with tasks for scss compilation, concatenating and uglifying JavaScript, compressing images, and running webpack builds (Webpack 4).

It also makes use of the Phusion tasks in [`phusion-vue`](https://github.com/iammikeburke/phusion-vue) and [`phusion`](https://github.com/iammikeburke/phusion)  e.g. merging config files, dev server, config driven routes etc. These tasks have been included in the Gulp setup.


### Getting Started

First, install npm dependencies.

```bash
npm install
```

Then just run gulp.

```bash
gulp
```

### Gulp

When running gulp, there is an optional environment variable we can pass (`ENV`). Available options are `dev` and `prod`. When running for `dev`, sourcemaps will be included for scss, JavaScript and TypeScript files. Also, the Phusion [`ConfigTask`](https://github.com/iammikeburke/phusion/blob/master/docs/build/task/ConfigTask.md) will merge environment-specific config files depending on the environment set (see [`phusion`](https://github.com/iammikeburke/phusion/blob/master/docs/build/task/ConfigTask.md) docs for more info). If `ENV` is not set, it will default to `dev`.

The default gulp task runs all build tasks, followed by all watch tasks, then spins up a development server and opens the page in the browser.

```bash
gulp
```

Running `gulp build` will run all build tasks once and then exit. Watch tasks and dev server are **not** run.

```bash
gulp build
```

##### Available Tasks:

###### Build tasks:
- ***scss:*** Processes `.scss` files and outputs css. When building for `prod`, these files also get run through an auto-prefixer and then minified. Source maps are included when building for `dev`.
- ***copy:*** Copies font files into public directory.
- ***imgMin:*** Compresses all images and adds them to the public directory.
- ***jsConcat:*** Concatenates an array of JavaScript files (used for building a bundle of app dependencies e.g. Vue)
- ***jsUglify:*** Uglifies all JavaScript files in the js directory.
- ***webpack:*** Runs webpack using `webpack.config.js`

###### Watch tasks:
- ***scssWatch:*** Runs the scss task when `.scss` files change.
- ***copyWatch:*** Runs the copy task src files are added to, removed or changed.
- ***imgMinWatch:*** Runs the imgMin task when images are added/removed/changed.
- ***jsUglifyWatch:*** Runs the jsUglify task when JavaScript src files are changed.

###### Phusion build tasks:
- ***config:*** Merges all config files and caches out the merged config object as JSON.
- ***classmap:*** Scans the project for component classes and builds a cache of components by name.
- ***routes:*** Reads the routes defined in the config and builds a routes file ready to be imported by webpack.
- ***templates:*** Finds the associated template files for all components in the classmap and outputs a cache of templates by component name.
- ***serve:*** Spins up a development server with live reloading.

###### Phusion watch tasks:
- ***configWatch:*** Runs the config task when `.yaml` files in the config directory are added/removed/changed. 
- ***classmapWatch:*** Runs the classmap task when components are added/removed/changed.
- ***routesWatchTask:*** Runs the routes task when config files change. 
- ***templatesWatchTask:*** Runs the template task when `.html` files change.
