// @ts-ignore
import { PageService } from '@/connection/resources.js'
import { Category } from '@/types'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    categories: {}
  },
  mutations: {
    update(state: any, payload: any) {
      Vue.set(state.categories, payload.key, payload.data)
    }
  },
  actions: {
    getItemsByName(context: any, categoryName: String): Category[] {
      return PageService.byCompanyByCategoryName({
        companySlug: 'shintamaniwild',
        categoryName: categoryName
      }).then((res: any) => {
        context.commit('update', { key: categoryName, data: res })
      })
    }
  },
  getters: {
    getItems(state: any) {
      return state.categories
    }
  }
}
