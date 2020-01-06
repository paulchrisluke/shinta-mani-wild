<template>
  <content-placeholders v-if="showPlaceholder" :class="classPlaceholder" centered rounded>
    <content-placeholders-heading />
  </content-placeholders>
  <component :is="type" v-else :class="className" class="base-heading text-uppercase font-serif">
    <span class="d-block mb-4">
      <span
        :class="{'border-bottom border-dark': borderDark, 'border-bottom border-light': borderLight}"
        class="d-inline-flex"
      >
        {{text}}
      </span>
      <div v-if="borderArt" class="border-art mt-2"></div>
    </span>
  </component>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'base-heading',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    borderDark: {
      type: Boolean,
      default: false
    },
    borderLight: {
      type: Boolean,
      default: false
    },
    borderArt: {
      type: Boolean,
      default: false
    },
    showPlaceholder: {
      type: Boolean,
      default: false
    },
    classPlaceholder: {
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
.base-heading {
  margin-bottom: 0;
}
.border-art {
  background: url("https://res.cloudinary.com/whynotearth/image/upload/h_24/Shinta%20Mani%20Wild/Home/line_v7vngp.png") no-repeat center;
  background-size: contain;
  height: rem(16px);
  @include media-breakpoint-up(md) {
    height: rem(24px);
  }

}
</style>