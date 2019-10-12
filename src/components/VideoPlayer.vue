<template>
  <div
    @click.stop="onClickVideo()"
    :class="{ 'has-inner-shadow': !isStarted}"
    class="video-player mh-inherit position-relative cursor-pointer"
  >
    <!-- <pre class="debug">
      isPaused: {{this.isPaused}}
    </pre> -->

    <div
      v-if="!isStarted"
      class="video-poster position-absolute h-100"
      :style="{'background-image': `url(${poster})`}"
    ></div>

    <video
      ref="video"
      class="video-player--video d-block w-100 mh-inherit"
      @play="onPlay"
      @ended="onEnd"
      v-bind="rest"
    >
      <source :src="source" type="video/mp4" />
    </video>

    <div
      v-if="isPaused"
      :class="{'is-paused': isStarted && !isEnded && isPaused, 'is-ended': isEnded}"
      class="video-player--overlay position-absolute"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      videoElement: {} as HTMLVideoElement,
      isStarted: false,
      isEnded: false,
      isPaused: false
    }
  },
  mounted() {
    this.videoElement = this.$refs.video as HTMLVideoElement
    // this.setVolume(0.2)
  },
  methods: {
    onClickVideo() {
      if (this.isEnded) {
        this.replay()
      } else {
        this.togglePlay()
      }
      this.isPaused = this.videoElement.paused
    },
    setVolume(volume: number) {
      this.videoElement.volume = volume
    },
    replay() {
      this.isEnded = false
      this.videoElement.currentTime = 0
      this.videoElement.play()
    },
    togglePlay() {
      if (this.videoElement.paused) {
        this.videoElement.play()
      } else {
        this.videoElement.pause()
      }
    },
    onPlay() {
      this.isStarted = true
      this.isEnded = false
      this.$emit('videoplayer-played')
    },
    onEnd() {
      this.isEnded = true
      this.isPaused = this.videoElement.paused
    }
  },
  props: {
    source: {
      type: String
    },
    poster: {
      type: String
    },
    rest: {
      default: {},
      type: Object
    }
  }
})
</script>

<style lang="scss" scoped>
.video-player {
  background-color: $black;
}
.video-player--video:focus {
  outline: none;
}
.video-poster {
  @include stick-around;
  background: no-repeat center;
  background-size: cover;
}
.video-player--overlay {
  transition: background-color 500ms ease;
  &.is-paused {
    background: center no-repeat rgba($black, 0.2)
      url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570555404/Shinta%20Mani%20Wild/general/play_vqfrbb.svg');
    background-size: rem(64px);
  }
  &.is-ended {
    background: center no-repeat rgba($black, 0.2)
      url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570555404/Shinta%20Mani%20Wild/general/play_vqfrbb.svg');
    background-size: rem(64px);
  }
  @include stick-around;
}
</style>