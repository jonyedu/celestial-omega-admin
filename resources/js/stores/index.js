import homeStore from "./home";
//import authStore from "./auth";
import Vuex from 'vuex';

const stores = new Vuex.Store({
    modules: {
        home: homeStore,
        //auth: authStore,
    }
});

export default stores;
