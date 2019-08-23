<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
    </div>-->
    <router-view :key="$route.name + ($route.params.id || '')"/>
  </div>
</template>

<style lang="scss">
@import '@/styles/global.scss';
</style>
