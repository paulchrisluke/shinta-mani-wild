import { GalleryImage } from '@/types'
import AOS from 'aos'
import Rellax from 'rellax'
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
        once: true,
        duration: 800,
        anchorPlacement: 'center-bottom'
      })

      // documentation: https://github.com/dixonandmoe/rellax
      new Rellax('.doodle', {
        speed: -1,
        // center: true,
        vertical: true,
        horizontal: false
      })
    }
  },
  methods: {
    getRellaxSpeed() {
      return -(0.1 + Math.random() * 0.2)
    },
    relativeDoodleAmount(
      itemsLength: number,
      offset: number = 0,
      plus: number
    ) {
      if (!itemsLength) {
        return NaN
      }
      const length = itemsLength - offset
      return Math.max(Math.floor(length / 4) + 1 + plus, 4)
    }
  }
}
