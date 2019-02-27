
import {Phusion} from "./module/Phusion/Phusion";
import {VueJsApp} from "phusion-vue/src/core/VueJsApp";
import applicationConfig from './cache/config';

let phusion = new Phusion(applicationConfig);

let app = new VueJsApp(phusion);

app.init('[example-app]');
