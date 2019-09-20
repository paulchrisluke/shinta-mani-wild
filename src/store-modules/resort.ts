// @ts-ignore
import { PageService } from '@/connection/resources.js'
import Vue from 'vue'

const defaultResort = {
  resort: {}
}
export default {
  namespaced: true,
  state: {
    resort: defaultResort
  },
  mutations: {
    update(state: any, payload: any) {
      Vue.set(state, 'resort', payload)
    }
  },
  actions: {
    getItemBySlug(context: any, slug: string) {
      context.state.resort = defaultResort
      return PageService.get({
        companySlug: 'shintamaniwild',
        pageSlug: slug
      }).then((res: any) => {
        context.commit('update', res)
      })
    }
  },
  getters: {
    getItem(state: any) {
      return state.resort
    }
  }
}
