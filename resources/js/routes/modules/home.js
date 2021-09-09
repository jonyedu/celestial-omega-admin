import store from '@/store';
const prefijo = store.get('seguridad@prefijo');

const home = [
    {
        path: prefijo,
        component: () => import("@/layouts/home/index"),
        name: "home",
        children: [
            {
                path: prefijo,
                component: () => import("@/modules/dashboard/ui/index"),
                name: "index_galeria"
            },
            {
                path: 'modulo/galeria/mostrar_galeria',
                component: () => import("@/modules/galeria/ui/index"),
                name: "index_galeria"
            },
            {
                path: 'modulo/evento/mostrar_evento',
                component: () => import("@/modules/evento/ui/index"),
                name: "index_evento"
            },
            {
                path: 'modulo/programa/mostrar_programa',
                component: () => import("@/modules/programa/ui/index"),
                name: "index_programa"
            },
        ],
    },

];

export default home;
