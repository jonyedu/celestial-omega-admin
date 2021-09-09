import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const generalStore = {
    namespaced: true,

    //AQUI ES DONDE SE DECLARA LAS VARIABLES A USAR
    state: {
        customers: null,
        pagination: {
            page: 0,
            rowsPerPage: 0,
        },
        totalItems: 0,
    },
    //SON LOS SEETER DE LAS VARIABLES. una mutacion se va a realizar siempre y cuando sea llamada desde una acccion
    mutations: {
        updateCustomers(state, payload) {
            state.customers = payload.data
            state.pagination.page = payload.current_page
            state.pagination.rowsPerPage = payload.per_page
            state.totalItems = payload.total
        },
    },
    actions: {
        getCustomers(context, page) {
            let page_number = page.page || this.state.pagination.page;
            let rowsPerPage = page.rowsPerPage || this.state.pagination.rowsPerPage;
            Axios.get(
                "/galeria?page=" + page_number + "&rowsPerPage=" + rowsPerPage
            ).then((response) => {
                context.commit("updateCustomers", response.data.customers);
            });
        },
    },
    //SON LOS GETTER DE LAS VARIABLES
    getters: {
        get(state) {
            return state.prefijo;
        }
    }
};

export default generalStore;
