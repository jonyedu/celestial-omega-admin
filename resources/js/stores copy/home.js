import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const homeStore = {
    namespaced: true,

    //AQUI ES DONDE SE DECLARA LAS VARIABLES A USAR
    state: {
        dark: true,
        drawerImage: true,
        mini: false,
        drawer: null,
        image:
            "https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg",
        gradient: "rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)",
        items: [
            {
                title: "Dashboard",
                icon: "mdi-view-dashboard",
                to: "/"
            },
            {
                title: "User Profile",
                icon: "mdi-account",
                to: "/components/profile/"
            },
            {
                title: "Regular Tables",
                icon: "mdi-clipboard-outline",
                to: "/tables/regular/"
            },
            {
                title: "Typography",
                icon: "mdi-format-font",
                to: "/components/typography/"
            },
            {
                title: "Icons",
                icon: "mdi-chart-bubble",
                to: "/components/icons/"
            },
            {
                title: "Google Maps",
                icon: "mdi-map-marker",
                to: "/maps/google/"
            },
            {
                title: "Notifications",
                icon: "mdi-bell",
                to: "/components/notifications/"
            }
        ]
    },
    //SON LOS SEETER DE LAS VARIABLES. una mutacion se va a realizar siempre y cuando sea llamada desde una acccion
    mutations: {
        SET_DARK(state, dark) {
            state.dark = dark;
        },
        SET_DARKIMAGE(state, drawerImage) {
            state.drawerImage = drawerImage;
        },
        SET_MINI(state, mini) {
            state.mini = mini;
        },
        SET_DRAWER(state, drawer) {
            state.drawer = drawer;
        },
        SET_IMAGE(state, image) {
            state.image = image;
        },
        SET_GRADIENT(state, gradient) {
            state.gradient = gradient;
        }
    },
    actions: {},
    //SON LOS GETTER DE LAS VARIABLES
    getters: {
        GET_PREFIJO(state) {
            return state.prefijo;
        },
        GET_DARK(state) {
            return state.dark;
        },
        GET_DARKIMAGE(state) {
            return state.drawerImage;
        },
        GET_MINI(state) {
            return state.mini;
        },
        GET_DRAWER(state) {
            return state.drawer;
        },
        GET_IMAGE(state) {
            return state.image;
        },
        GET_GRADIENT(state) {
            return state.gradient;
        },
        GET_ITEMS(state) {
            return state.items;
        },
    }
};

export default homeStore;
