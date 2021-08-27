import seguridadStore from "./seguridad";
import homeStore from "./home";
import Vuex from 'vuex';

const stores = new Vuex.Store({
    modules: {
        seguridad: seguridadStore,
        home: homeStore,
    }
});

export default stores;
