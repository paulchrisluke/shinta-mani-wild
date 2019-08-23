<template>
  <div
    :class="className"
    class="quote mx-auto"
  >
    <div class="quote-text text-center text-dark">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'base-quote',
  props: {
    className: {
      type: String,
      required: true,
      validator: function(value: string) {
        // The value must match one of these strings
        return ['is-left', 'is-right'].indexOf(value) !== -1
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.quote {
  @include media-breakpoint-up(xl) {
    &.is-left {
      background-image: url('~@/assets/media/home/dog-bubble-1.png');
    }
    &.is-right {
      background-image: url('~@/assets/media/home/dog-bubble-2.png');
    }
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