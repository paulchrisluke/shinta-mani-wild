<template>
  <div ref="wrapperGhost" class="wrapper-ghost">
    <base-action-bar
      :title="title"
      :price="price"
      :class="{'fixed-bottom': distance > thresholdDistance}"
    >
      <template slot="action-button">
        <base-image-link
          :class-name="'is-secondary is-md'"
          :text="'Book Now'"
          :href="cloudbedsBookingLink"
          :rest="{target: '_blank'}"
        ></base-image-link>
      </template>
    </base-action-bar>
  </div>
</template>

<script>
import BaseImageLink from '@/components/BaseImageLink.vue'
import BaseActionBar from '@/components/BaseActionBar'
import { isPassiveEventsSupported } from '@/helpers'
export default {
  name: 'booking-bar',
  components: {
    BaseImageLink,
    BaseActionBar
  },
  props: {
    title: String,
    price: Number
  },
  data() {
    return {
      thresholdDistance: 0,
      distance: 0,
      isPassiveSupported: false
    }
  },
  mounted() {
    this.thresholdDistance = document.querySelector('.page-footer').clientHeight
    this.isPassiveSupported = isPassiveEventsSupported()
    this.setInitialDistance()
    this.positionListener()
  },
  destroyed() {
    document.removeEventListener('scroll', this.onScrollPage)
  },
  methods: {
    setInitialDistance() {
      this.distance = document.body.offsetHeight
    },
    positionListener() {
      document.addEventListener(
        'scroll',
        this.onScrollPage,
        // TODO: use getPassiveEventConfig()
        this.isPassiveSupported ? { passive: true } : false
      )
    },
    onScrollPage(event) {
      var scrollPosition = window.pageYOffset
      var windowSize = window.innerHeight
      var bodyHeight = document.body.offsetHeight

      this.distance = Math.max(bodyHeight - (scrollPosition + windowSize), 0)
    }
  }
}
</script>

<style lang="scss">
$bar-height: rem(80px);
.wrapper-ghost {
  height: $bar-height;
}
</style>