// @ts-ignore
import { PageService } from '@/connection/resources.js'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    items: {}
  },
  mutations: {
    update(state: any, { data, slug }: any) {
      const items = Object.assign({}, state.items, { [slug]: data })
      Vue.set(state, 'items', items)
    }
  },
  actions: {
    getItemBySlug(context: any, slug: string) {
      context.state.items[slug] = {}
      return PageService.get({
        companySlug: 'shintamaniwild',
        pageSlug: slug
      }).then((data: any) => {
        context.commit('update', { data, slug })
      })
    }
  },
  getters: {
    getItem(state: any) {
      return state.items
    },
    getItemBySlug: (state: any) => (slug: string) => {
      return state.items[slug] || {}
    }
  }
}
