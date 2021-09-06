require('./bootstrap');

import App from './layouts/App';
import Vue from 'vue';
import store from './store';
import VueRouter from 'vue-router';
import routes from './routes/index';
import vuetify from './plugins/vuetify';
import { sync } from 'vuex-router-sync'
import './plugins';
import './components';



//store.dispatch("seguridad/getConfigEmpresa");

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
});

sync(store, router)

const app = new Vue({
    el: '#app',
    store,
    router,
    vuetify,
    render: h => h(App),
});
