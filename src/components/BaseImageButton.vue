<template>
  <button :type="type" @click="onClick" class="d-inline-flex base-image-button p-0 d-block text-center" :class="className" :aria-label="text" v-bind="rest">
    <base-button-ui :size="size" :theme="theme">{{text}}</base-button-ui>
  </button>
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
    type: {
      type: String,
      default: 'submit'
    },
    rest: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onClick($event: any) {
      this.$emit('click')
    }
  }
})
</script>

<style lang="scss" scoped>
.base-image-button {
  background: none;
  border: none;
  outline: none;
}
</style>
