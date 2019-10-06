<template>
  <content-placeholders v-if="showPlaceholder" class="placeholder-image" centered rounded>
    <content-placeholders-img />
  </content-placeholders>
  <div v-else v-show="isVisible">
    <iframe
      class="d-block mx-auto video-player--iframe"
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
    showPlaceholder: {
      type: Boolean,
      default: false
    },
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

<style lang="scss">
.video-player--iframe {
  max-width: 100%;
}
</style>