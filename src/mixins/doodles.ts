import { GalleryImage } from '@/types'
import AOS from 'aos'
import store from '@/store'
import { getRandomsOf } from '@/helpers'

export default {
  mounted() {
    store.dispatch('asset/getItemBySlug', 'background-images')
  },
  computed: {
    doodles(): GalleryImage[] {
      return store.getters['asset/backgroundImages']
    },
    pageDoodles(): GalleryImage[] {
      const doodles = this.doodles
      return getRandomsOf(doodles as any)
    }
  },
  watch: {
    doodles() {
      // documentation: https://github.com/michalsnik/aos
      // demo: https://michalsnik.github.io/aos/
      AOS.init({
        delay: 50,
        anchorPlacement: 'center-bottom'
      })
    }
  }
}
