<template>
  <div
    v-if="items.length > 0"
    class="story-slider d-flex flex-grow-1 position-relative"
    :class="[isImageItem(items[0]) ? 'is-gallery':'is-stories']"
  >
    <!-- blurred background -->
    <div class="story-slider--background position-absolute overflow-hidden">
      <div
        v-if="items.length > 0 && swiper.activeIndex >= 0"
        class="story-slider--layer position-absolute"
        :style="{'background-image': `url(${getBlurredImage(swiper.activeIndex)})`}"
      ></div>
      <div class="story-slider--layer is-shade position-absolute"></div>
    </div>

    <div class="story-slider--inner mx-auto w-100 d-flex">
      <div class="swiper-container py-4 my-auto">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide story d-flex align-items-center"
            v-for="(item, index) in items"
            :key="index"
          >
            <div class="story--inner position-relative w-100 mx-auto">
              <div
                @click="goToSlide(index)"
                class="aspect-ratio-box"
                :class="[{'cursor-pointer': index !== swiper.activeIndex}, custom.ratioBoxClass]"
              >
                <div class="aspect-ratio-box-inside">
                  <img
                    class="story--content is-image"
                    v-if="isImageItem(item)"
                    :src="transformCloudinaryUrl(item.url, 'q_auto:best')"
                    alt
                  />
                  <video
                    v-else
                    @loadeddata="onLoadedVideoData($event, index)"
                    @loadedmetadata="onLoadVideoMetadata($event, index)"
                    @playing="onVideoPlaying(index)"
                    @ended="onVideoEnd(index)"
                    class="story--content is-video"
                    preload="none"
                    :poster="shouldLoadVideoPoster(index) && getPosterImage(item.image, 'q_25')"
                    :muted="isMute"
                  >
                    <source
                      :src="transformCloudinaryUrl(item.image, 'q_auto:good,ac_none')"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>

              <div
                class="story--details position-absolute px-3 d-flex justify-content-between align-items-center"
              >
                <!-- music bars -->
                <div
                  v-if="swiper.activeIndex >= 0"
                  :class="{'d-none': videoHasNoSounds[index] || !shouldPlayMusicBars(index)}"
                >
                  <music-bars />
                </div>
                <!-- like -->
                <!-- <a @click.stop.prevent class="like my-3 ml-auto" href="#">
                  <img
                    class="like-image d-block"
                    src="https://res.cloudinary.com/ddwsbpkzk/image/upload/v1569402128/Shinta%20Mani%20Wild/general/icon-like-outline_dlymsz.svg"
                    alt
                  />
                </a>-->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>

      <a
        class="story--back position-absolute p-2 p-md-3 cursor-pointer hover-button-bg"
        title="Close"
        @click.stop.prevent="onClickBack"
      >
        <img
          class="d-block"
          src="https://res.cloudinary.com/ddwsbpkzk/image/upload/v1569565108/Shinta%20Mani%20Wild/general/close_zs1pi4.svg"
          alt
        />
      </a>
    </div>

    <!-- Pagination -->
    <div class="story--nav position-absolute">
      <div class="d-flex">
        <div class="d-flex mx-auto align-items-center">
          <div class="story--nav-tools d-flex align-items-end h-100 mx-3">
            <a
              aria-label="Toggle Sound"
              @click="isMute = !isMute"
              class="mute-toggle d-block cursor-pointer hover-button-bg"
              :class="{'is-mute': isMute, 'has-sound': !isMute}"
            ></a>
          </div>
          <div class="swiper-pagination swiper-pagination-white ml-auto mr-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import MusicBars from '@/components/BaseMusicBars.vue'
import Swiper from 'swiper'
import '@/styles/lib-swiper.scss'
import Vue from 'vue'
import { isNumber } from 'lodash-es'
import {
  changeUrlExtension,
  transformCloudinaryUrl,
  hasAudio,
  getPosterImage
} from '../helpers'
import { GalleryImage, Story } from '../types'
export default Vue.extend({
  name: 'story-slider',
  components: {
    MusicBars
  },
  data() {
    return {
      swiper: {} as Swiper,
      videoDurations: [] as number[],
      videoHasNoSounds: [] as boolean[],
      isMute: true
    }
  },
  props: {
    items: {
      type: Array,
      default: []
    },
    custom: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    if (!this.swiper.el && this.items.length > 0) {
      this.init()
    }
  },
  watch: {
    items() {
      this.$nextTick(this.init)
    }
  },
  methods: {
    init() {
      this.initSlider()
      this.playActiveVideo()
    },
    shouldPlayMusicBars(index: number): boolean {
      if (this.isMute) {
        return false
      }
      if (index !== this.swiper.activeIndex) {
        return false
      }
      return true
    },
    isImageItem(item: any) {
      if (item.url) {
        return true
      }
      return false
    },
    getBlurredImage(index: number) {
      const item = this.items[index]
      if (this.isImageItem(item)) {
        return transformCloudinaryUrl((item as GalleryImage).url, 'q_auto:best')
      }
      return getPosterImage((item as Story).image, 'q_25')
    },
    goToSlide(index: number) {
      this.swiper.slideTo(index)
    },
    saveVideoDuration(index: number, duration: number) {
      this.videoDurations[index] = duration
    },
    onLoadedVideoData($event: any, index: number) {
      const videoElement = $event.target
      this.videoHasNoSounds[index] = !hasAudio(videoElement)
    },
    onLoadVideoMetadata($event: any, index: number) {
      const videoDuration = $event.target.duration
      if (videoDuration > 0 && videoDuration < Infinity) {
        this.saveVideoDuration(index, videoDuration * 1000)
      }
    },
    onVideoPlaying(index: number) {
      this.setBulletTransition(this.swiper.activeIndex)
    },
    onVideoEnd(index: number) {
      this.swiper.slideNext()
    },
    setBulletTransition(
      index: number,
      // @ts-ignore
      duration: number = this.videoDurations[index]
    ) {
      const $navBullets = document.querySelectorAll('.swiper-pagination-bullet')
      const bullet = $navBullets[index] as HTMLElement
      this.setTransition(bullet, `all ${duration}ms linear`)
      setTimeout(() => {
        bullet.classList.add('is-playing')
      }, 0)
    },
    resetBulletStyle(index: number) {
      const $navBullets = document.querySelectorAll('.swiper-pagination-bullet')
      const bullet = $navBullets[index] as HTMLElement
      this.setTransition(bullet, 'none')
      bullet.classList.remove('is-playing')
    },
    setTransition(element: HTMLElement, value: string) {
      if (element) {
        element.style.transition = value
      }
    },
    shouldLoadVideoPoster(index: number) {
      const maxVisibleSlides = 3
      return (
        // preload 2 images out of view
        Math.abs(index - this.swiper.activeIndex) <= maxVisibleSlides / 2 + 2
      )
    },
    onClickBack() {
      this.$emit('on-click-back')
    },
    getVideoElementByIndex(index: number) {
      return this.swiper.slides[index].querySelector('.story--content.is-video')
    },
    playActiveVideo() {
      const activeVideo = this.getVideoElementByIndex(this.swiper.activeIndex)
      if (activeVideo) {
        activeVideo.currentTime = 0
        activeVideo.play()
      }
    },
    pausePrevVideo() {
      const prevVideo = this.getVideoElementByIndex(this.swiper.previousIndex)
      if (prevVideo) {
        prevVideo.pause()
      }
    },
    initSlider(): void {
      const that = this
      // documentation: https://swiperjs.com/api
      that.swiper = new Swiper('.swiper-container', {
        keyboard: { onlyInViewport: true },
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        pagination: {
          // dynamicBullets: true,
          el: '.swiper-pagination',
          clickable: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          992: {
            slidesPerView: 3,
            spaceBetween: 32
          }
        },
        on: {
          slideChange() {
            that.pausePrevVideo()
          },
          slideChangeTransitionEnd() {
            that.playActiveVideo()
          },
          // reset left slide on go forward
          slideNextTransitionStart() {
            const leftIndex = that.swiper.activeIndex - 1
            if (leftIndex >= 0) {
              that.resetBulletStyle(leftIndex)
            }
          },
          // reset right slide on go backward
          slidePrevTransitionStart() {
            const activeIndex = that.swiper.activeIndex

            const rightIndex = that.swiper.activeIndex + 1
            if (rightIndex <= that.swiper.slides.length) {
              that.resetBulletStyle(rightIndex)
            }
          }
        }
      })
    }
  }
})
</script>

<style lang='scss' scoped>
.story-slider--background {
  @include stick-around;
}
.story-slider--layer {
  // minus is a fix for white margins on blur filter
  top: rem(-100px);
  left: rem(-100px);
  right: rem(-100px);
  bottom: rem(-100px);
  filter: blur(50px);
  background-size: cover;
  background-position: center;
  &.is-shade {
    background-color: rgba($black, 0.2);
  }
}
.swiper-container {
  width: 100%;
  box-sizing: content-box;
}
.swiper-slide {
  transition: transform 300ms ease;
  transform: scale(0.92);
}
.story--inner {
  max-height: 100%;
  box-shadow: rem(0px 7px 8px) rgba($black, 0.2),
    rem(0px 5px 22px) rgba($black, 0.12), rem(0px 12px 17px) rgba($black, 0.14);
  border-radius: rem(20px);

  transition: opacity 300ms ease;
  opacity: 0.05;
  &:hover {
    opacity: 0.3;
  }
}
.swiper-slide-active {
  transform: scale(1);
  z-index: 1;

  .story--inner {
    opacity: 1;
    &:hover {
      opacity: 1;
    }
  }
}
.story--content {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: rem(20px);
}
.story--details {
  right: 0;
  left: 0;
  bottom: 0;
}
.story--title {
  font-size: rem(32px);
}
.swiper-button-prev {
  left: rem(40px);
  &::after {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath style='fill:%23333' d='M15.7 22l-9.5-9.5L15.7 3l-3-3L.4 12.6 12.8 25'/%3E%3C/svg%3E")
      no-repeat center;
    transform: translate(-65%, -50%);
  }
  &:hover {
    transform: translateX(#{rem(-8px)});
  }
  @include media-breakpoint-down(md) {
    left: 0;
  }
}
.swiper-button-next {
  right: rem(40px);
  &::after {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath style='fill:%23333' d='M.3 3l9.5 9.5L.3 22l3 3 12.4-12.5L3.2 0'/%3E%3C/svg%3E")
      no-repeat center;
    margin-right: rem(-4px);
    transform: translate(-35%, -50%);
  }
  &:hover {
    transform: translateX(#{rem(8px)});
  }
  @include media-breakpoint-down(md) {
    right: 0;
  }
}
.swiper-button-white {
  width: rem(56px);
  height: rem(56px);
  border-radius: 100%;
  &::after {
    background-size: rem(12px);
    width: rem(16px);
    height: rem(28px);
    position: absolute;
    top: 50%;
    left: 50%;
    content: '';
  }

  background: rgba($white, 0.4);
  transition: transform 1000ms ease, background-color 1000ms ease;
  &:hover,
  &:focus {
    background-color: $white;
  }
  @include media-breakpoint-down(md) {
    opacity: 0;
    width: rem(104px);
    top: 25%;
    bottom: 25%;
    height: auto;
    border-radius: 0;
    &:hover {
      transform: translateX(0);
    }
  }
}

::v-deep {
  .swiper-pagination {
    position: static;
    min-height: rem(32px);
  }
  .swiper-pagination-bullet {
    $default-transition: 15000ms;
    width: rem(18px);
    height: rem(4px);
    border-radius: rem(4px);
    background: rgba($white, 0.4);
    opacity: 1;
    margin: 0 rem(2px);
    position: relative;
    overflow: hidden;
    transition: transform $default-transition linear;
    @include media-breakpoint-up(md) {
      width: rem(48px);
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateX(0%);
      background: $white;
      transition: inherit;
    }
  }
  .swiper-pagination-bullet-active {
    &::before {
      transform: translateX(-100%);
      transition: none;
    }
    &.is-playing {
      &::before {
        transform: translateX(0%);
        transition: inherit;
      }
    }
    ~ .swiper-pagination-bullet {
      &::before {
        transform: translateX(-100%);
      }
    }
  }
  .swiper-button-white:focus {
    outline: none;
    user-select: none;
  }
}
.like {
  user-select: none;
}
.like-image {
  width: rem(32px);
  height: rem(32px);
}
.story--nav {
  bottom: rem(16px);
  left: 0;
  right: 0;
  z-index: 10;
}
.story--back {
  top: rem(24px);
  left: rem(24px);
  z-index: 11;
  background-color: rgba($black, 0.2);
  border-radius: rem(100px);
  transition: all 200ms ease;
  @include media-breakpoint-up(md) {
    top: rem(40px);
    left: rem(40px);
  }
  img {
    width: rem(16px);
    height: rem(16px);
    @include media-breakpoint-up(md) {
      width: rem(24px);
      height: rem(24px);
    }
  }
}
.mute-toggle {
  width: rem(56px);
  height: rem(56px);
  &.is-mute {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23FFF'%3E%3Cpath d='M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E")
      no-repeat center;
  }
  &.has-sound {
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23FFF'%3E%3Cpath d='M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E")
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
