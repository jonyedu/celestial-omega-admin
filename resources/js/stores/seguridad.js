import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const seguridadStore = {
    namespaced: true,

    //AQUI ES DONDE SE DECLARA LAS VARIABLES A USAR
    state: {
        prefijo: '/Omega',
    },
    //SON LOS SEETER DE LAS VARIABLES. una mutacion se va a realizar siempre y cuando sea llamada desde una acccion
    mutations: {
        SET_PREFIJO(state, prefijo) {
            state.prefijo = prefijo;
        }
    },
    actions: {
        async logout({ dispatch }) {
            await axios.post("/logout");
            return dispatch("getUser");
        },

        getConfigEmpresa({ commit }) {
            axios
                .get("/api/get-config-empresa")
                .then(res => {
                    if (res.data.url != null) {
                        commit("SET_PREFIJO", res.data.url);
                    }else{
                        commit("SET_PREFIJO", '/home');
                    }

                })
                .catch(() => {
                    console.log("error");
                    commit("SET_PREFIJO", '/home');
                });
        }
    },
    //SON LOS GETTER DE LAS VARIABLES
    getters: {
        GET_PREFIJO(state) {
            return state.prefijo;
        }
    }
};

export default seguridadStore;
