<template>
  <section class="wrapper" :style="{'background-image': `url(${image.url})`}">
    <div class="container is-small h-100">
      <div class="row h-100 align-items-center">
        <div class="col-4">
          <slot />
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
  background: no-repeat center;
  background-size: cover;
}
.wrapper::v-deep .button-frame {
  $button-width: 172px;
  $button-height: 72px;
  width: rem($button-width);
  height: rem($button-height);
  background: url('~@/assets/img/button-book-now-light.png');
  background-size: rem($button-width $button-height);
}
</style>