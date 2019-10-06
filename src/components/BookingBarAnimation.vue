<template>
  <div class="object-animation position-relative" ref="wrapper">
    <div class="object-animation--inner">
      <div :style="objectStyle" class="hand position-absolute"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { easing, keyframes, styler, spring, everyFrame } from 'popmotion'

export default Vue.extend({
  data() {
    return {
      objectStyle: {},
      envHeight: 600,
      posX: 0,
      posY: 600,
      totalWidth: 600
    }
  },
  mounted() {
    // this.listenForScroll()

    const divStyler = styler(document.querySelector('.hand') as Element)
    const distance = 50

    // documentation: https://popmotion.io/pure/
    const { stop } = everyFrame().start((timestamp: number) => {
      const rotateValue = Math.sin(0.004 * timestamp * 0.5) * 22
      divStyler
        .set('y', distance * Math.sin(0.004 * timestamp * 0.5 - Math.PI / 4))
        .set('x', timestamp / 9)
        .set('rotate', rotateValue)
    })
    setTimeout(() => {
      stop()
    }, 6900)
  },
  methods: {
    // listenForScroll() {
    //   document.addEventListener('scroll', event => {
    //     this.updateStyle()
    //   })
    // },
    getViewportTopDistance() {
      const element = this.$refs.wrapper as Element
      if (!element) {
        return
      }
      console.log('element. ', element, element.getBoundingClientRect().top)
      return element.getBoundingClientRect().top
    }
  }
})
</script>

<style lang='scss' scoped>
.object-animation--inner {
  transform: rotate(10deg);
}
.hand {
  width: rem(118px);
  height: rem(64px);
  top: rem(200px);
  left: 0;
  background: no-repeat center
    url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570368155/Shinta%20Mani%20Wild/general/hand_b7suix.png');
  background-size: contain;
}
</style>
