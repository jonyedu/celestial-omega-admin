import store from '@/store';
const prefijo = store.get('seguridad@prefijo');

const home = [
    {
        path: prefijo,
        component: () => import("@/layouts/home/index"),
        name: "home",
        children: [
            {
                path:'modulo/galeria/mostrar_galeria',
                component: () => import("@/modules/galeria/ui/index"),
                name: "index_galeria"
            },
        ],
    },

];

export default home;
