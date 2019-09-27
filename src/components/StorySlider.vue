<template>
  <div class="d-flex flex-grow-1">
    <div class="story-slider mx-auto w-100 d-flex">
      <div class="swiper-container py-4 my-auto">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide story d-flex align-items-center"
            v-for="(item, index) in items"
            :key="index"
          >
            <div class="story--inner position-relative w-100 mx-auto">
              <div class="aspect-ratio-box ratio-9-16">
                <div class="aspect-ratio-box-inside">
                  <!-- <img src="http://placehold.it/414x736/66f" class="story--content" /> -->
                  <!-- <img :src="item.posterUrl" class="story--content" /> -->
                  <video
                    @loadedmetadata="onLoadVideoMetadata($event, index)"
                    @playing="onVideoPlaying(index)"
                    @ended="onVideoEnd(index)"
                    class="story--content is-video"
                    muted
                  >
                    <source :src="item.image" type="video/mp4" />
                  </video>
                </div>
              </div>

              <div class="story--details position-absolute px-3 d-flex">
                <!-- like -->
                <a @click.stop.prevent class="like ml-auto my-3" href="#">
                  <img
                    class="like-image d-block"
                    src="https://res.cloudinary.com/ddwsbpkzk/image/upload/v1569402128/Shinta%20Mani%20Wild/general/icon-like-outline_dlymsz.svg"
                    alt
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>

      <a
        class="story--back position-absolute p-3"
        title="Close"
        href="#"
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
    <div class="story--nav d-flex position-absolute">
      <div class="story--nav-inner mx-auto">
        <div class="swiper-pagination swiper-pagination-white mx-auto"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Swiper from 'swiper'
import '@/styles/lib-swiper.scss'

import Vue from 'vue'
import { isNumber } from 'lodash-es'
export default Vue.extend({
  name: 'story-slider',
  data() {
    return {
      swiper: {} as Swiper,
      videoDurations: [] as number[]
    }
  },
  props: {
    items: {
      type: Array,
      default: []
    },
    initialStoryIndex: {
      type: Number,
      default: 0
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
    saveVideoDuration(index: number, duration: number) {
      this.videoDurations[index] = duration
    },
    onLoadVideoMetadata($event: any, index: number) {
      const videoDuration = $event.target.duration
      if (videoDuration > 0 && videoDuration < Infinity) {
        this.saveVideoDuration(index, videoDuration * 1000)
      }
    },
    onVideoPlaying(index: number) {
      console.log('on playing');
      
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
      }, 0);
    },
    resetBulletStyle(index: number) {
      const $navBullets = document.querySelectorAll('.swiper-pagination-bullet')
      const bullet = $navBullets[index] as HTMLElement
      this.setTransition(bullet, 'none')
      bullet.classList.remove('is-playing')
    },
    setTransition(element: HTMLElement, value: string) {
      element.style.transition = value
    },
    onClickBack() {
      this.$emit('on-click-back')
    },
    playActiveVideo() {
      const activeVideo = this.swiper.slides[
        this.swiper.activeIndex
      ].querySelector('.story--content.is-video')
      if (activeVideo) {
        activeVideo.play()
      }
    },
    pausePrevVideo() {
      const prevVideo = this.swiper.slides[
        this.swiper.previousIndex
      ].querySelector('.story--content.is-video')
      if (prevVideo) {
        prevVideo.pause()
        prevVideo.currentTime = 0
      }
    },
    initSlider(): void {
      const that = this
      // documentation: https://swiperjs.com/api
      that.swiper = new Swiper('.swiper-container', {
        keyboard: { onlyInViewport: true },
        initialSlide: this.initialStoryIndex,
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
            that.playActiveVideo()
            that.pausePrevVideo()
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
.story-slider {
  max-width: rem(1100px);
}
.swiper-container {
  width: 100%;
  box-sizing: content-box;
  @include media-breakpoint-up(lg) {
    max-height: rem(624px);
  }
}
.swiper-slide {
  transition: transform 300ms ease, opacity 300ms ease;
  transform: scale(0.92);
  opacity: 0.05;
  &:hover {
    opacity: 0.3;
  }
}
.swiper-slide-active {
  transform: scale(1);
  opacity: 1;
  &:hover {
    opacity: 1;
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
.story--inner {
  max-width: 414px;
  max-height: 100%;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0px 7px 8px rgba(0, 0, 0, 0.2), 0px 5px 22px rgba(0, 0, 0, 0.12),
      0px 12px 17px rgba(0, 0, 0, 0.14);
    border-radius: rem(20px);
  }
}
.story--details {
  right: 0;
  left: 0;
  bottom: 0;
}
.story--title {
  font-size: rem(32px);
}
::v-deep {
  .swiper-pagination {
    position: static;
  }
  .swiper-pagination-bullet {
    $default-transition: 15000ms;
    width: rem(48px);
    height: rem(4px);
    border-radius: rem(4px);
    background: rgba($white, 0.4);
    opacity: 1;
    margin: 0 rem(2px);
    position: relative;
    overflow: hidden;
    transition: all $default-transition linear;
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
      transition: none
    }
    &.is-playing {
      &::before {
        transform: translateX(0%);
        transition: inherit
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
.like-image {
  width: rem(32px);
  height: rem(32px);
}
.story--nav {
  bottom: rem(48px);
  left: 0;
  right: 0;
  z-index: 10;
  height: rem(32px);
}
.story--nav-inner {
  width: rem(414px);
}
.story--back {
  top: 0;
  left: 0;
  img {
    width: rem(24px);
    height: rem(24px);
  }
}
</style>
