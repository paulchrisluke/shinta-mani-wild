<template>
  <!-- empty page for testing -->
  <!-- route: /testing -->
  <div>
    <div>
      <a
        aria-label="Toggle Sound"
        @click="toggleMute"
        class="mute-toggle d-block cursor-pointer hover-button-bg"
        :class="{'is-mute': isMute, 'has-sound': !isMute}"
      ></a>
    </div>

    <video
      class="story--content is-video"
      preload="none"
      :poster="'https://res.cloudinary.com/ddwsbpkzk/video/upload/q_25,so_0/v1567844155/Shinta%20Mani%20Wild/Adventures/Anti-Poaching%20Patrol/Story_3_-_Shinta_Mani_Anti_Poaching_gbwpep.jpg'"
      playsinline
      muted="muted"
    >
      <source
        :src="'https://res.cloudinary.com/ddwsbpkzk/video/upload/q_auto:good/v1567844155/Shinta%20Mani%20Wild/Adventures/Anti-Poaching%20Patrol/Story_3_-_Shinta_Mani_Anti_Poaching_gbwpep.mp4'"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'chicken-sink',
  components: {},
  data() {
    return {
      isMute: true
    }
  },
  mounted() {
    this.playActiveVideo()
  },
  methods: {
    toggleMute() {
      this.isMute = !this.isMute
      const activeVideo = document.querySelector('video') as HTMLVideoElement
      activeVideo.muted = this.isMute
    },
    playActiveVideo() {
      const activeVideo = document.querySelector('video') as HTMLVideoElement
      if (activeVideo) {
        activeVideo.currentTime = 0
        activeVideo.muted = this.isMute
        activeVideo.autoplay = true
        activeVideo.play()
      }
    }
  }
})
</script>

<style lang='scss' scoped>
.story--content {
  height: 80vh;
}

.mute-toggle {
  width: rem(56px);
  height: rem(56px);
  &.is-mute {
    background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570887492/Shinta%20Mani%20Wild/general/sound-muted_sxxwst.svg')
      no-repeat center;
  }
  &.has-sound {
    background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570887492/Shinta%20Mani%20Wild/general/sound-enabled_dwwxaq.svg')
      no-repeat center;
  }
  background-color: $dark !important;
}
</style>