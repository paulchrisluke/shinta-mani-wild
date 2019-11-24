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
      // @ts-ignore
      this.initAOS()
    }
  },
  methods: {
    initAOS() {
      // documentation: https://github.com/michalsnik/aos
      // demo: https://michalsnik.github.io/aos/
      AOS.init({
        once: true,
        easing: 'ease-in-out',
        anchorPlacement: 'center-bottom'
      })
    },
    setItemParallax(event: any) {
      // documentation: https://github.com/dixonandmoe/rellax
      new Rellax(event.target.parentElement, {
        vertical: true,
        horizontal: false
      })
    },
    getRellaxSpeed() {
      return -2.5
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
