import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';
import {routes} from "./router/routes.js"
import {store} from "./store/store.js"

import Carousel3d from 'vue-carousel-3d';

Vue.use(Carousel3d);

Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  //aqui se pone las rutas
  routes,
  mode:"history"
})

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store,
}).$mount('#app')
