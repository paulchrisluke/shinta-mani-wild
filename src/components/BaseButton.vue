<template>
  <button
    @click="onClick($event)"
    class="d-flex justify-content-center align-items-center button button-frame"
    :aria-label="text"
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
    callback: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onClick(event: object) {
      this.$emit('click', event)
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