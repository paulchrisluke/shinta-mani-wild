import Vue from "vue";
import Vuex from "vuex";
import resort from './store-modules/resort'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    resort
  }
});

export default store;