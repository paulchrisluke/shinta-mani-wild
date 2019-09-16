<template>
  <button
    :class="className"
    class="button btn"
    v-text="text"
    :type="type"
  ></button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    text: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: 'btn-primary'
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    onClick(event: any) {
      this.$emit('click', event)
    }
  }
})
</script>

<style lang="scss" scoped>
// 
</style>
