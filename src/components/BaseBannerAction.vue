<template>
  <section class="wrapper position-relative" :style="getWrapperStyle()">
    <div class="position-absolute video-wrapper" v-if="video">
      <video class="video mx-auto d-block" autoplay muted loop>
        <source :src="video" type="video/mp4">
      </video>
    </div>
    <div class="container is-small h-100">
      <div class="row h-100 align-items-center">
        <div class="col-4">
          <div class="px-5">
            <slot />
            <base-button :text="'Book Now'"></base-button>
          </div>
        </div>
        <div class="col-8"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseHeading from '@/components/BaseHeading.vue'
export default Vue.extend({
  name: 'base-banner-action',
  components: {
    BaseButton,
    BaseHeading
  },
  props: {
    image: {
      type: String
    },
    video: {
      type: String
    }
  },
  methods: {
    getWrapperStyle () {      
      if (!this.image) {
        return
      }
      return {
        'background-image': `url(${this.image})`
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  height: rem(400px);
  background: $black no-repeat center;
  background-size: cover;
}
.video-wrapper {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
::v-deep .button-frame {
  $button-width: 172px;
  $button-height: 72px;
  width: rem($button-width);
  height: rem($button-height);
  background: url('~@/assets/img/button-book-now-light.png');
  background-size: rem($button-width $button-height);
}
</style>