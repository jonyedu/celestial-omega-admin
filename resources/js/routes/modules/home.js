import store from '@/store';
const prefijo = store.get('seguridad@prefijo');

const home = [
    {
        path: prefijo,
        component: () => import("@/layouts/home/index"),
        name: "home"
    },
];

export default home;
