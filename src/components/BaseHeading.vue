<template>
  <component :is="type" :class="className" class="text-uppercase font-serif">
    <span class="d-block mb-4">
      <span :class="borderClass" class="pb-2 d-inline-flex">
        <slot />
      </span>
    </span>
  </component>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'base-heading',
  props: {
    type: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    borderClass: {
      type: String,
      default: 'border-bottom border-dark'
    }
  }
})
</script>