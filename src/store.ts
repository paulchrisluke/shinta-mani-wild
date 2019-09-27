import Vue from 'vue'
import Vuex from 'vuex'
import resort from './store-modules/resort'
import category from './store-modules/category'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    resort,
    category
  }
})

export default store
