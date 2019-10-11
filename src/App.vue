<template>
  <div id="app">
    <router-view :key="$route.name + ($route.params.id || '')" />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'app'
})
</script>


<style lang="scss">
@import '@/styles/global.scss';
</style>
