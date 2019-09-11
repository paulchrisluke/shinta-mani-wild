// @ts-ignore
import { PageService } from '@/connection/resources.js'

const defaultResort = {}
export default {
  namespaced: true,
  state: {
    resort: defaultResort
  },
  mutations: {
    update(state: any, payload: any) {
      state.resort = payload
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
    getResort(state: any) {
      return state.resort
    }
  }
}
