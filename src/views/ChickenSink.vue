<template>
  <div>
    <video-player
      @playing="startedPlaying = true"
      :source="'https://res.cloudinary.com/ddwsbpkzk/video/upload/v1566989920/Shinta%20Mani%20Wild/home/shinta_mani_wild_promo_video_r3spkb.mp4'"
      :poster="'https://res.cloudinary.com/ddwsbpkzk/image/upload/v1567147165/Shinta%20Mani%20Wild/home/Hero_Image_xns3mw_vkpdgg.jpg'"
      :video-transformations="''"
      :poster-transformations="'q_auto:good'"
      :rest="{autoplay: 'true', muted: true, loop: true}"
    ></video-player>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
export default Vue.extend({
  components: {
    VideoPlayer
  }
})
</script>

<style lang='scss' scoped>
//
</style>