<template>
  <!-- empty page for testing -->
  <!-- route: /testing -->
  <div>
    <base-quote :type="'grass1'">
      <div class="quote" v-html="resort.h2"></div>
    </base-quote>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import BaseQuote from '@/components/BaseQuote.vue'

export default Vue.extend({
  components: { BaseQuote },
  mounted() {
    this.$store.dispatch('resort/getItemBySlug', 'home')
  },
  computed: {
    resort() {
      return this.$store.getters['resort/getItem']
    }
  }
})
</script>

<style lang='scss' scoped>
//
</style>