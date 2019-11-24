<template>
  <div id="app">
    <router-view />
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
