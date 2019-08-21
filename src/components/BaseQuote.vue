<template>
  <div class="quote mx-auto" :style="{'background-image': `url(${image.default.src})`}">
    <div class="quote-text text-center font-weight-light font-italic text-dark">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'base-quote',
  props: {
    image: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.quote {
  @include media-breakpoint-up(xl) {
    width: rem(1086px);
    height: rem(346px);
    background-repeat: no-repeat;
  }
}
.quote-text {
  font-size: rem(24px);
  line-height: 1.3;
  @include media-breakpoint-up(xl) {
    padding: rem(40px 96px 0 96px);
  }
}
</style>