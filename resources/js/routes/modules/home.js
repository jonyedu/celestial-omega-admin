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
                name: "index_dashboard"
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
            {
                path: 'modulo/live/mostrar_live',
                component: () => import("@/modules/live/ui/index"),
                name: "index_live"
            },
            {
                path: 'modulo/genero_musical/mostrar_genero_musical',
                component: () => import("@/modules/genero_musical/ui/index"),
                name: "index_genero_musical"
            },
            {
                path: 'modulo/musica/mostrar_musica',
                component: () => import("@/modules/musica/ui/index"),
                name: "index_musica"
            },
            {
                path: 'modulo/carrusel/mostrar_carrusel',
                component: () => import("@/modules/carrusel/ui/index"),
                name: "index_carrusel"
            },
        ],
    },

];

export default home;
