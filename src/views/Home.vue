<template>
  <div class="page page--home">
    <page-header></page-header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'

export default Vue.extend({
  name: 'home',
  components: {
    PageHeader
  }
})
</script>
