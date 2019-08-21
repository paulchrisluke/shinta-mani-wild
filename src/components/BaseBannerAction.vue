<template>
  <section class="wrapper" :style="{'background-image': `url(${image.default.src})`}">
    <div class="container is-small h-100">
      <div class="row h-100 align-items-center">
        <div class="col-4">
          <base-heading :type="'h2'" :class-name="'h1 text-center text-xl-left text-light'" :border-class="'border-bottom border-light'">
            <slot />
          </base-heading>
          <base-button :text="'Book Now'"></base-button>
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
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  height: rem(400px);
  background: no-repeat;
  background-size: cover;
}
.wrapper::v-deep .button-frame {
  width: rem(190px);
  height: rem(88px);
  background: url('~@/assets/img/button-book-now-light.png');
  background-size: rem(190px 88px);
}
</style>