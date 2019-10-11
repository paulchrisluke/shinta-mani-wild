import Vue from 'vue'
import Vuex from 'vuex'
import resort from './store-modules/resort'
import category from './store-modules/category'
import asset from './store-modules/asset'
import loading from './store-modules/loading'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    resort,
    category,
    asset,
    loading
  }
})

export default store
