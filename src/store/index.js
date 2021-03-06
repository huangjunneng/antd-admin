import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import settings from './modules/settings'
import user from './modules/user'
import menulist from './modules/menulist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
    user,
    menulist
  },
  getters
})
