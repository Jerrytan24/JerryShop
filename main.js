import Vue from 'vue'
import App from './App'
import {JerryRequest} from "util/api.js"
import store from "./store/index.js"
Vue.prototype.$JerryRequest = JerryRequest;
Vue.config.productionTip = false;
App.mpType = 'app'
import {JerrySecond} from "util/api.js"

Vue.prototype.$JerrySecond=JerrySecond;

const Demo = Vue.extend({});
const d = new Demo();
Vue.prototype.x = d;

const app = new Vue({
    ...App,
	store,
})
app.$mount()
