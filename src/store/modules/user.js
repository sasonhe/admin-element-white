

const state = {
  name: '',//用户名
  account:'',//用户账号
  avatar: '',

}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
}

const actions = {

  // user login
  toLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
