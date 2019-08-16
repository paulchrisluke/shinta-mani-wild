<template>
  <div v-show="isVisible">
    <iframe
      class="d-block mx-auto"
      width="1322"
      height="744"
      :src="`${source}?rel=0`"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    isVisible: {
      default: true,
      type: Boolean
    },
    source: {
      required: true,
      type: String
    }
  }
})
</script>