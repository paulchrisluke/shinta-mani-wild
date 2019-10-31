<template>
  <a ripple class="d-inline-flex text-decoration-none user-select-none" :class="className" :aria-label="text" v-bind="rest">
    <base-button-ui :size="size" :theme="theme">{{text}}</base-button-ui>
  </a>
</template>

<script lang='ts'>
import Vue from 'vue'
import BaseButtonUi from '@/components/BaseButtonUI.vue'
export default Vue.extend({
  name: 'base-image-link',
  components: { BaseButtonUi },
  props: {
    text: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'secondary'
    },
    size: {
      type: String,
      default: 'md'
    },
    href: {
      type: String,
      default: null
    },
    className: {
      type: String,
      default: ''
    },
    rest: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>
