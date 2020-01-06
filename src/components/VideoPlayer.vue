<template>
  <div
    @click.stop="onClickVideo()"
    :class="{ 'has-inner-shadow': !isStarted}"
    class="video-player mh-inherit position-relative cursor-pointer"
  >
    <transition name="fade">
      <div
        v-if="isErrored || shouldShowPoster"
        class="video-poster position-absolute h-100 w-100"
        :style="{'background-image': `url(${getPosterImage(source, `so_${posterFrameSecond},q_auto:good,w_1920,ar_${heroVideoRatio},c_fill`)})`}"
      >
        <picture>
          <source
            v-for="size in gridBreakpointsArray"
            :key="size"
            :media="`(max-width: ${size}px)`"
            :srcset="getPosterImage(source, `so_${posterFrameSecond},q_auto:good,w_${size},ar_${heroVideoRatio},c_fill`)"
          />
          <img
            class="h-100"
            :src="getPosterImage(source, `so_${posterFrameSecond},q_auto:good,w_1920,ar_${heroVideoRatio},c_fill`)"
            alt="Shinta Mani Wild"
          />
        </picture>
      </div>
    </transition>

    <video
      ref="video"
      class="video-player--video d-block w-100 mh-inherit"
      muted
      playsinline
      @play="onPlay"
      @playing="onPlaying"
      @ended="onEnd"
      @error="onError"
      @waiting="onWaiting"
      @loadeddata="onLoad"
      v-bind="rest"
    >
      <source :src="transformCloudinaryUrl(source, videoTransformations)" type="video/mp4" />
    </video>

    <!-- paused screen -->
    <transition name="fade-fast">
      <div
        v-if="isPaused"
        :class="{'is-paused': isStarted && !isEnded && isPaused, 'is-ended': isEnded}"
        class="video-player--overlay position-absolute"
      ></div>
    </transition>

    <!-- loading screen -->
    <transition name="fade-fast">
      <!-- FIXME: add && !isPaused -->
      <div
        v-if="(isWaiting && !isEnded && !isErrored) || !isLoaded"
        class="video-player--overlay position-absolute d-flex justify-content-center align-items-center"
      >
        <base-loading-spinner />
      </div>
    </transition>

    <div class="video-player--tools position-absolute">
      <a
        v-if="isStarted && !this.videoElement.controls"
        aria-label="Toggle Sound"
        @click.stop.prevent="toggleMute"
        class="mute-toggle d-block cursor-pointer hover-button-bg ml-2 mb-2"
        :class="{'is-mute': isMute, 'has-sound': !isMute}"
      ></a>
    </div>

    <transition name="fade-fast">
      <div
        v-if="(isLoaded && !isStarted) || isEnded"
        class="video-player--swipup d-block d-md-none">
        <div class="scroll-indicator scroll-indicator-first"></div>
        <div class="scroll-indicator scroll-indicator-second"></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseLoadingSpinner from '@/components/BaseLoadingSpinner.vue'
export default Vue.extend({
  components: { BaseLoadingSpinner },
  // TODO: move heroVideoRatio to data()
  data() {
    return {
      videoElement: {} as HTMLVideoElement,
      isStarted: false,
      isWaiting: false,
      isEnded: false,
      isPaused: false,
      isMute: true,
      isLoaded: false,
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
      this.isEnded = false
    },
    onPlaying() {
      this.$emit('videoplayer-played')
      this.isErrored = false
      this.shouldShowPoster = false
      this.isWaiting = false
      this.isStarted = true
    },
    onWaiting($event: any, index: number) {
      this.isWaiting = true
    },
    onEnd() {
      this.isEnded = true
      this.isPaused = this.videoElement.paused
      this.shouldShowPoster = true
    },
    onError() {
      this.isErrored = true
    },
    onLoad () {
      this.isLoaded = true
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
      default: 'q_auto:best',
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
.video-player {
  background-color: $black;
}
.video-player--video {
  object-fit: cover;
  max-height: rem(992px);
  height: calc(100vh - #{rem($header-height-mobile)});
  // stylelint-disable-next-line
  height: calc(var(--vh, 1vh) * 100 - #{rem($header-height-mobile)});
  @include media-breakpoint-up(md) {
    height: calc(100vh - #{rem($header-height)});
    // stylelint-disable-next-line
    height: calc(var(--vh, 1vh) * 100 - #{rem($header-height)});
  }
  &:focus {
    outline: none;
  }
}
.video-poster {
  @include stick-around;

  // older browsers
  background: no-repeat center;
  background-size: cover;
  img {
    display: none;
  }

  // modern browsers
  @supports (object-fit: cover) {
    background: none !important;
    img {
      display: block;
      object-fit: cover;
      width: 100%;
    }
  }
}
.video-player--overlay {
  &.is-paused {
    background-image: url('https://res.cloudinary.com/whynotearth/image/upload/v1574308911/Shinta%20Mani%20Wild/General/play_aphyj3_l6zwo1.svg');
  }
  &.is-ended {
    background-image: url('https://res.cloudinary.com/whynotearth/image/upload/v1574308911/Shinta%20Mani%20Wild/General/play_aphyj3_l6zwo1.svg');
  }
  background: center no-repeat rgba($black, 0.2);
  background-size: rem(48px);
  @include stick-around;
  @include media-breakpoint-up(md) {
    background-size: rem(96px);
  }
}
.video-player--tools {
  height: rem(56px);
  bottom: 0;
}
.mute-toggle {
  width: rem(48px);
  height: rem(48px);
  &.is-mute {
    background: url('https://res.cloudinary.com/whynotearth/image/upload/v1574308918/Shinta%20Mani%20Wild/General/sound-muted_sxxwst_cf2d5o.svg')
      no-repeat center;
  }
  &.has-sound {
    background: url('https://res.cloudinary.com/whynotearth/image/upload/v1574308918/Shinta%20Mani%20Wild/General/sound-enabled_dwwxaq_zk1y63.svg')
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
.video-player--swipup {
  width: 100%;
  height: rem(110px);
  position: absolute;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #000000 99.85%);
}
// Animate scroll indicator
$speed: 2s;
$delay: 1s;
.scroll-indicator {
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 50% 50%;
}
.scroll-indicator-first {
  animation: arrow-first-animate $speed $delay ease-in-out infinite;
  top: 42%;
}
.scroll-indicator-second {
  animation: arrow-second-animate $speed $delay ease-in-out infinite;
  top:50%
}
.scroll-indicator:before,
.scroll-indicator:after {
  background: $white;
  content: '';
  display: block;
  height: rem(2px);
  position: absolute;
  top: 0;
  left: 0;
  width: rem(12px);
}
.scroll-indicator:before {
  transform: rotate(45deg) translateX(-23%);
  transform-origin: top left;
}
.scroll-indicator:after {
  transform: rotate(-45deg) translateX(23%);
  transform-origin: top right;
}
@keyframes arrow-first-animate {
  10% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes arrow-second-animate {
  20% {
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
