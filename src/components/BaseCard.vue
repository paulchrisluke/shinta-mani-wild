<template>
  <div class="wrapper-card row">
    <div class="text col-6">
      <div class="p-5">
        <slot name="text"></slot>
      </div>
    </div>
    <div class="image col-6 d-flex align-items-center">
      <div class="p-3">
        <slot name="image"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'base-card'
})
</script>

<style lang="scss" scoped>
.wrapper-card {
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: rem(15px);
  border-top: rem(24px) solid $primary;
  background: $brand-2;
}
</style>