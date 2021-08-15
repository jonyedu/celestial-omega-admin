import store from '../stores';
const prefijo = store.state.seguridad.prefijo;

const home = [
    {
        path: prefijo,
        component: () => import("@/layouts/home/index"),
        name: "home"
    },
];

export default home;
