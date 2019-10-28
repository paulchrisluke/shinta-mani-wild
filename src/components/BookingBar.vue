<template>
  <div ref="wrapperGhost" class="booking-bar">
    <base-action-bar
      :title="title"
      :price="price"
      :class="{'fixed-bottom': bottomDistance > thresholdDistance}"
    >
      <template slot="action-button">
        <div class="d-none d-md-flex align-items-center">
          <base-image-link
            :theme="'secondary'"
            :size="'md'"
            :text="'Book Now'"
            :href="cloudbedsBookingLink"
          ></base-image-link>
        </div>
        <div class="d-flex d-md-none align-items-center">
          <base-image-link
            :theme="'secondary'"
            :size="'xs'"
            :text="'Book Now'"
            :href="cloudbedsBookingLink"
          ></base-image-link>
        </div>
      </template>
    </base-action-bar>
  </div>
</template>

<script>
import BaseImageLink from '@/components/BaseImageLink.vue'
import BaseActionBar from '@/components/BaseActionBar'
import { getPassiveEventConfig } from '@/helpers'
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
      bottomDistance: 0
    }
  },
  mounted() {
    this.thresholdDistance = document.querySelector('.page-footer').clientHeight
    this.setInitialDistance()
    this.positionListener()
  },
  destroyed() {
    document.removeEventListener('scroll', this.onScrollPage)
  },
  methods: {
    setInitialDistance() {
      this.bottomDistance = document.body.offsetHeight
    },
    positionListener() {
      document.addEventListener(
        'scroll',
        this.onScrollPage,
        getPassiveEventConfig()
      )
    },
    onScrollPage(event) {
      var scrollPosition = window.pageYOffset
      var windowSize = window.innerHeight
      var bodyHeight = document.body.offsetHeight

      this.bottomDistance = Math.max(bodyHeight - (scrollPosition + windowSize), 0)
    }
  }
}
</script>

<style lang="scss" scoped>
$bar-height-sm: rem(40px);
$bar-height-md: rem(80px);
.booking-bar {
  z-index: $booking-bar-zindex;
  position: relative;
  opacity: 1;
  transition: opacity $loading-transition-time ease;
  height: $bar-height-sm;
  @include media-breakpoint-up(md) {
    height: $bar-height-md;
  }
}
[page-is-loading] {
  .booking-bar {
    opacity: 0;
  }
}
</style>