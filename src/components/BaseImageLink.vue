<template>
  <a
    :class="className"
    class="d-flex justify-content-center align-items-center button button-frame"
    :aria-label="text"
  ></a>
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
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  box-shadow: none;
  outline: none;
  border: none;
  background-color: transparent;
}
</style>
