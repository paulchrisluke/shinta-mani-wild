<template>
  <div v-if="items.length > 0" class="story-slider d-flex flex-grow-1 position-relative">
    <!-- blurred background -->
    <div class="story-slider--background position-absolute overflow-hidden">
      <div
        v-if="items.length > 0 && swiper.activeIndex >= 0"
        class="story-slider--layer position-absolute"
        :style="{'background-image': `url(${getBlurredImage(swiper.activeIndex)})`}"
      ></div>
      <div class="story-slider--layer is-shade position-absolute"></div>
      <!-- preload next image -->
      <link
        rel="preload"
        v-if="items.length > swiper.activeIndex + 1"
        :href="getBlurredImage(swiper.activeIndex + 1)"
        as="image"
      />
    </div>

    <div class="story-slider--inner mx-auto w-100 d-flex">
      <div class="swiper-container py-4 my-auto">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide d-flex align-items-center"
            v-for="(item, index) in items"
            :key="index"
          >
            <div class="story--inner position-relative w-100 mx-auto">
              <div
                @click="goToSlide(index)"
                class="aspect-ratio-box mx-auto"
                :class="[{'cursor-pointer': index !== swiper.activeIndex}, custom.ratioBoxClass]"
              >
                <div class="aspect-ratio-box-inside">
                  <div class="story--content-wrapper position-relative h-100">
                    <picture>
                      <source
                        v-for="size in gridBreakpointsArray"
                        :key="size"
                        :media="`(max-width: ${size}px)`"
                        :srcset="transformCloudinaryUrl(item.url, `q_auto:best,f_auto,c_limit,w_${size},ar_${galleryImageRatio}`)"
                      />
                      <img
                        class="story--content is-image"
                        :src="transformCloudinaryUrl(item.url, `q_auto:best,f_auto,c_limit,w_${gridBreakpointsArray.slice(-1)[0]},ar_${galleryImageRatio}`)"
                        alt
                      />
                    </picture>

                    <div
                      class="story--details position-absolute px-3 d-flex justify-content-between align-items-center mx-auto"
                    >
                      <!-- like -->
                      <!-- <a @click.stop.prevent class="like my-3 ml-auto" href="#">
                        <img
                          class="like-image d-block"
                          src="https://res.cloudinary.com/whynotearth/image/upload/v1574308909/Shinta%20Mani%20Wild/General/icon-like-outline_dlymsz_ma4gp4.svg"
                          alt
                        />
                      </a>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Navigation tap areas in mobile -->
        <div
          @click="swiper.slideNext()"
          class="swiper-tap-area-mobile is-next position-absolute d-lg-none"
        ></div>
        <div
          @click="swiper.slidePrev()"
          class="swiper-tap-area-mobile is-prev position-absolute d-lg-none"
        ></div>
      </div>

      <!-- Navigation -->
      <div class="swiper-button-next swiper-button-white d-none d-lg-block"></div>
      <div class="swiper-button-prev swiper-button-white d-none d-lg-block"></div>

      <a
        class="story--back position-absolute p-2 p-md-3 cursor-pointer hover-button-bg"
        title="Close"
        @click.stop.prevent="onClickBack"
      >
        <img
          class="d-block"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1574308908/Shinta%20Mani%20Wild/General/close_zs1pi4_we04hs.svg"
          alt
        />
      </a>
    </div>

    <!-- Pagination -->
    <div class="story--nav position-absolute">
      <div class="d-flex w-100">
        <div
          class="swiper-pagination swiper-pagination-white ml-auto d-flex align-items-center w-100"
        ></div>
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

const autoplayDuration = 5000

export default Vue.extend({
  name: 'gallery-slider',
  components: {
    MusicBars
  },
  data() {
    return {
      swiper: {} as Swiper,
      galleryImageRatio: 1.7778
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
    },
    getBlurredImage(index: number) {
      const item = this.items[index]
      return transformCloudinaryUrl((item as GalleryImage).url, 'q_4,w_540,f_auto,c_limit')
    },
    goToSlide(index: number) {
      this.swiper.slideTo(index)
    },
    resetBulletStyle(index: number) {
      const $navBullets = document.querySelectorAll('.swiper-pagination-bullet')
      const bullet = $navBullets[index] as HTMLElement

      this.setTransition(bullet, 'none')
      bullet.classList.add('reset-bullet-transition')
      setTimeout(() => {
        this.setTransition(bullet, '')
        bullet.classList.remove('reset-bullet-transition')
      }, 0)
    },
    setTransition(element: HTMLElement, value: string) {
      if (element) {
        element.style.transition = value
      }
    },
    onClickBack() {
      this.$emit('on-click-back')
    },
    initSlider(): void {
      const that = this
      // documentation: https://swiperjs.com/api
      that.swiper = new Swiper('.swiper-container', {
        autoplay: {
          delay: autoplayDuration,
          disableOnInteraction: false,
          stopOnLastSlide: true
        },
        speed: 540,
        keyboard: { onlyInViewport: true },
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          init() {
            setTimeout(() => {
              that.resetBulletStyle(0)
            }, 0)
          },
          slideChange() {
            that.resetBulletStyle(that.swiper.activeIndex)
          },
          slideChangeTransitionEnd() {},
          // reset left slide on go forward
          slideNextTransitionStart() {
            const leftIndex = that.swiper.activeIndex - 1
            if (leftIndex >= 0) {
              that.resetBulletStyle(leftIndex)
            }
          },
          // reset right slide on go backward
          slidePrevTransitionStart() {
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
  top: rem(-152px);
  left: rem(-152px);
  right: rem(-152px);
  bottom: rem(-152px);
  filter: blur(50px);
  background-size: cover;
  background-position: center;
  &.is-shade {
    background-color: rgba($black, 0.2);
  }
}
.story-slider--inner {
  height: 100vh;
  // stylelint-disable-next-line
  height: calc(var(--vh, 1vh) * 100);
}
.swiper-container {
  width: 100%;
  box-sizing: content-box;
  height: calc(100vh - #{rem(24px * 2)});
  // stylelint-disable-next-line
  height: calc(var(--vh, 1vh) * 100 - #{rem(24px * 2)});
}
.swiper-slide {
  max-height: inherit;
  transform: scale(0.92);
  transition: transform 540ms ease;
}
.swiper-wrapper,
.story--inner,
.story--inner .aspect-ratio-box-inside,
.story--content-wrapper {
  max-height: calc(100vh - #{rem(56px)});
  // stylelint-disable-next-line
  max-height: calc(var(--vh, 1vh) * 100 - #{rem(56px)});
}
.story--inner {
  border-radius: rem($slide-border-radius);
  transition: opacity 540ms ease;
  opacity: 0.05;
  max-width: calc(100vw - #{rem(40px)});
  @include media-breakpoint-up(lg) {
    max-width: calc(100vw - #{rem(240px)});
  }
  &:hover {
    opacity: 0.3;
  }
}
$swiper-scale-active-slide: 1;
.story--content {
  width: auto;
  height: auto;
  max-height: 100%;
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: rem($slide-border-radius);
  box-shadow: rem(0px 7px 8px) rgba($black, 0.2),
    rem(0px 5px 22px) rgba($black, 0.12), rem(0px 12px 17px) rgba($black, 0.14);
}
.swiper-slide-active {
  transform: scale(1);
  z-index: 1;
  @include media-breakpoint-up(lg) {
    transform: scale($swiper-scale-active-slide) !important;
    .story--inner,
    .story--content {
      border-radius: rem($slide-border-radius / $swiper-scale-active-slide);
    }
    .story--details {
      transform: scale(1 / $swiper-scale-active-slide);
      left: auto !important;
    }
  }
  .story--inner {
    opacity: 1;
    &:hover {
      opacity: 1;
    }
  }
}
.story--details {
  right: 0;
  left: 0;
  bottom: 0;
  min-height: rem(64px);
  max-width: 100%;
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
    transform: translate(#{rem(-8px)}, rem(-28px + 12px));
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
    transform: translate(#{rem(8px)}, rem(-28px + 12px));
  }
  @include media-breakpoint-down(md) {
    right: 0;
  }
}
.swiper-button-white {
  width: rem(56px);
  height: rem(56px);
  border-radius: 100%;
  box-shadow: 0 0 4px rgba($black, 0.3);
  transform: translateY(rem(-28px + 12px));
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
}

.swiper-tap-area-mobile {
  z-index: 10;
  opacity: 0;
  top: 15vh;
  height: 70vh;
  margin: 0;
  width: rem(33.334vw);
  &:hover {
    transform: none;
  }
  &.is-next {
    right: 0;
  }
  &.is-prev {
    left: 0;
  }
}

::v-deep {
  .swiper-pagination {
    position: static;
    min-height: rem(16px);
  }
  .swiper-pagination-bullet {
    flex-basis: 0;
    flex-grow: 1;
    height: rem(2px);
    border-radius: rem(4px);
    background: rgba($white, 0.4);
    opacity: 1;
    margin: 0 rem(2px);
    position: relative;
    overflow: hidden;
    transition: none;
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
    $transition-duration: 5000ms;
    transition: transform $transition-duration linear;
    &::before {
      transform: translateX(0%);
      transition: inherit;
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
  .reset-bullet-transition {
    &::before {
      transform: translateX(-100%) !important;
    }
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
  bottom: 0;
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
  box-shadow: 0 0 4px rgba($black, 0.3);
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
.hover-button-bg {
  &:hover {
    background-color: rgba($black, 0.4);
    border-radius: rem(100px);
    transition: all 200ms ease;
  }
}
</style>
