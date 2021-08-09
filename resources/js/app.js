require('./bootstrap');

window.Vue = require('vue');

// import App from './layouts/App';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes/index';
import store from './stores/index';
import vuetify from './plugins/vuetify';
import './plugins'

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
});

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
});
