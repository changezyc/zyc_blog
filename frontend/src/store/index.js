import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 全局属性变量
  state: {
    // isSignIn 登录状态，0为未登录
    isSignIn: 0,
    token: '',
    // 所有文章标题
    articleTitle: [],
  },
  // 全局同步方法, 调用方法,this.$store.commit("xxx")
  mutations: {
    changIsSignIn(state, n) {
      state.isSignIn = n;
    },
    setToken(state, val) {
      state.token = val;
    },
  },
  // this.$store.dispatch("xxx")
  actions: {
  },
  getters: {
  },
  modules: {
  }
})
