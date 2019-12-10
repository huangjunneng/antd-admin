import { getMenuList } from '@/api/menuList'
import { getToken } from '@/utils/auth'

const token = getToken()
const state = {
  menulist: []
}

const mutations = {
  SET_MENU_LIST: (state, menulist) => {
    state.menulist = menulist
  }
}

const actions = {

  // get MenuList
  getMenuList({ commit }) {
    return new Promise((resolve, reject) => {
      getMenuList(token).then(response => {
        const { data } = response
        commit('SET_MENU_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
