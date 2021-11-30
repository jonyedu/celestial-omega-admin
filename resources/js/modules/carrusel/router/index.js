import store from '@/store';
const prefijo = store.get('seguridad@prefijo') + '/modulo/galeria';

const galeria = [
    // {
    //     path: prefijo + '/mostrar_galeria',
    //     component: () => import("@/modules/galeria/ui/index"),
    //     name: "index_galeria"
    // },
];

export default galeria;
