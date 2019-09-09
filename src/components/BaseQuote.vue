<template>
  <div
    :class="className"
    class="quote mx-auto"
  >
    <div class="quote-text text-center text-dark">
      <content-placeholders v-if="showPlaceholder" centered rounded>
        <content-placeholders-text :lines="4" />
      </content-placeholders>
      <slot v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'base-quote',
  props: {
    showPlaceholder: {
      type: Boolean,
      default: false
    },
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
      background-image: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1566988766/Shinta%20Mani%20Wild/home/Dog_Bubble2_c6civp.png');
    }
    &.is-right {
      background-image: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/a_hflip/Shinta%20Mani%20Wild/home/Dog_Bubble2_c6civp.png');
    }
    width: rem(1100px);
    height: rem(388px);
    background-repeat: no-repeat;
  }
}
.quote-text {
  font-size: rem(24px);
  line-height: 1.3;
  @include media-breakpoint-up(xl) {
    padding: rem(56px 96px 0 96px);
  }
}
</style>