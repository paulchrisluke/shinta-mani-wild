<template>
  <!-- empty page for testing -->
  <!-- route: /testing -->
  <div>
    <base-image-link
      :theme="'primary'"
      :size="'xs'"
      :text="'view tents'"
      :href="'#'"
      target="_blank"
    ></base-image-link>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import BaseImageLink from '@/components/BaseImageLink.vue'
export default Vue.extend({
  name: 'chicken-sink',
  components: {
    BaseImageLink
  }
})
</script>

<style lang='scss' scoped>
//
</style>