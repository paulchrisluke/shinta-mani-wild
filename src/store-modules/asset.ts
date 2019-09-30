// @ts-ignore
import { PageService } from '@/connection/resources.js'
import Vue from 'vue'
import { get } from 'lodash-es'

export default {
  namespaced: true,
  state: {
    'background-images': {
      images: []
    }
  },
  mutations: {
    update(state: any, payload: any) {
      Vue.set(state, payload.key, payload.value)
    }
  },
  actions: {
    getItemBySlug(context: any, slug: string) {
      if (context.getters.backgroundImages.length > 0) {
        return
      }

      return PageService.get({
        companySlug: 'shintamaniwild',
        pageSlug: slug
      }).then((res: any) => {
        context.commit('update', { key: slug, value: res })
      })
    }
  },
  getters: {
    backgroundImages(state: any) {
      return get(state, '["background-images"].images', [])
    }
  }
}
