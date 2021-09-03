// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/',
    },
    {
      title: 'Galeria',
      icon: 'mdi-image-album',
      to: '/modulo/galeria/mostrar_galeria',
    },
    {
      title: 'Eventos',
      icon: 'mdi-calendar-blank',
      to: '/modulo/evento/mostrar_evento',
    },
    {
      title: 'Programas',
      icon: 'mdi-calendar-clock',
      to: '/modulo/programa/mostrar_programa',
    },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
