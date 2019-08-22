<template>
  <component :is="type" :class="className" class="text-uppercase font-serif">
    <span class="d-block mb-4">
      <span
        :class="{'border-bottom border-dark': borderDark, 'border-bottom border-light': borderLight}"
        class="pb-2 d-inline-flex"
      >
        {{text}}
      </span>
      <div v-if="borderArt" class="border-art"></div>
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
    }
  }
})
</script>

<style lang="scss" scoped>
.border-art {
  height: rem(21px);
  background: url("~@/assets/img/border-art.png") no-repeat center;
}
</style>