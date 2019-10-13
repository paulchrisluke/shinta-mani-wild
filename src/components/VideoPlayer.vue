<template>
  <div
    @click.stop="onClickVideo()"
    :class="{ 'has-inner-shadow': !isStarted}"
    class="video-player mh-inherit position-relative cursor-pointer"
  >
    <div
      v-if="isErrored || shouldShowPoster"
      class="video-poster position-absolute h-100"
      :style="{'background-image': `url(${getPosterImage(source, `so_${posterFrameSecond},q_auto:good,w_${pageWidth},ar_${heroVideoRatio},c_fill,g_west`)})`}"
    ></div>

    <video
      ref="video"
      class="video-player--video d-block w-100 mh-inherit"
      muted
      playsinline
      @play="onPlay"
      @ended="onEnd"
      @error="onError"
      v-bind="rest"
    >
      <source :src="transformCloudinaryUrl(source, videoTransformations)" type="video/mp4" />
    </video>

    <div
      v-if="isPaused"
      :class="{'is-paused': isStarted && !isEnded && isPaused, 'is-ended': isEnded}"
      class="video-player--overlay position-absolute"
    ></div>

    <div class="video-player--tools position-absolute">
      <a
        v-if="isStarted"
        aria-label="Toggle Sound"
        @click.stop.prevent="toggleMute"
        class="mute-toggle d-block cursor-pointer hover-button-bg ml-2 mb-2"
        :class="{'is-mute': isMute, 'has-sound': !isMute}"
      ></a>
    </div>
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
      isPaused: false,
      isMute: true,
      shouldShowPoster: false,
      isErrored: false
    }
  },
  mounted() {
    this.videoElement = this.$refs.video as HTMLVideoElement
    this.restoreSettings()
    this.updateShowPoster()
  },
  methods: {
    updateShowPoster() {
      const waitForPlayingTimeout = 4000
      setTimeout(() => {
        if (!this.isStarted) {
          this.shouldShowPoster = true
        }
      }, waitForPlayingTimeout)
    },
    restoreSettings() {
      const isMute = localStorage.getItem('video-player-muted')
      if (isMute !== null) {
        this.setSound(JSON.parse(isMute))
      }
    },
    setSound(isMute: boolean) {
      this.isMute = isMute
      this.videoElement.muted = isMute
      localStorage.setItem('video-player-muted', String(isMute))
    },
    toggleMute() {
      this.setSound(!this.isMute)
    },
    onClickVideo() {
      if (this.isEnded) {
        this.replay()
      } else {
        this.togglePlay()
      }
      this.isPaused = this.videoElement.paused
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
      this.isErrored = false
      this.shouldShowPoster = false
      this.isStarted = true
      this.isEnded = false
      this.$emit('videoplayer-played')
    },
    onEnd() {
      this.isEnded = true
      this.isPaused = this.videoElement.paused
      this.shouldShowPoster = true
    },
    onError() {
      this.isErrored = true
    }
  },
  props: {
    source: {
      type: String
    },
    rest: {
      default: {},
      type: Object
    },
    posterFrameSecond: {
      default: 0,
      type: Number
    },
    videoTransformations: {
      default: 'q_auto',
      type: String
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
.video-player--tools {
  height: rem(56px);
  bottom: 0;
}
.mute-toggle {
  width: rem(48px);
  height: rem(48px);
  &.is-mute {
    background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570887492/Shinta%20Mani%20Wild/general/sound-muted_sxxwst.svg')
      no-repeat center;
  }
  &.has-sound {
    background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570887492/Shinta%20Mani%20Wild/general/sound-enabled_dwwxaq.svg')
      no-repeat center;
  }
}
.hover-button-bg {
  &:hover {
    background-color: rgba($black, 0.4);
    border-radius: rem(100px);
    transition: all 200ms ease;
  }
}
</style>