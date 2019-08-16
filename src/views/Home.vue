<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild?node-id=7%3A26 -->

  <div class="page page--home">
    <page-header></page-header>
    <div @click="showIntroVideo()" :class="{'has-image': !shouldShowIntroVideo}" class="hero">
      <!-- https://www.youtube.com/watch?v=SUWpCjzeMb4 -->
      <video-player
        :is-visible="shouldShowIntroVideo"
        source="https://www.youtube.com/embed/SUWpCjzeMb4"
      ></video-player>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

export default Vue.extend({
  name: 'home',
  components: {
    PageHeader,
    VideoPlayer
  },
  data() {
    return {
      shouldShowIntroVideo: false
    }
  },
  methods: {
    showIntroVideo() {
      this.shouldShowIntroVideo = true
    }
  }
})
</script>

<style lang="scss" scoped>
.hero {
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: $black;
  iframe {
    max-width: 100%;
    max-height: calc(100vh - #{$header-height});
  }

  &.has-image {
    background: url('~@/assets/img/home-hero.jpg') no-repeat;
    background-size: cover;
    height: rem(800px - $header-height);
    cursor: pointer;
  }
}
</style>