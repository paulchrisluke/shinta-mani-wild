<template>
  <div class="d-flex flex-grow-1">
    <div class="story-slider mx-auto w-100 d-flex">
      <!-- Pagination -->
      <!-- <div class="story--nav d-flex position-absolute">
        <div class="story--nav-inner d-flex justify-content-between mx-auto">
          <a class="story--back mt-1 ml-2" title="Back" href="#" @click.stop.prevent="onClickBack">
            <img
              src="https://res.cloudinary.com/ddwsbpkzk/image/upload/v1569402281/Shinta%20Mani%20Wild/general/arrow-left_xzk51z.svg"
              alt
            />
          </a>
          <div class="swiper-pagination swiper-pagination-white"></div>
          <div class="empty"></div>
        </div>
      </div> -->

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
                  <video class="story--content is-video" muted loop>
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
    </div>
  </div>
</template>

<script lang='ts'>
import Swiper from 'swiper'
import '@/styles/lib-swiper.scss'

import Vue from 'vue'
export default Vue.extend({
  name: 'story-slider',
  data() {
    return {
      swiper: {} as Swiper
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
      this.initSlider()
    }
    setTimeout(() => {
      console.log('mounted 3', this.swiper)
    }, 1000)
  },
  watch: {
    items() {
      this.$nextTick(this.initSlider)
    }
  },
  methods: {
    onClickBack() {
      this.$emit('on-click-back')
    },
    initSlider(): void {
      const that = this
      // documentation: https://swiperjs.com/api
      that.swiper = new Swiper('.swiper-container', {
        initialSlide: this.initialStoryIndex,
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        pagination: {
          // dynamicBullets: true,
          el: '.swiper-pagination',
          clickable: true
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
            const activeVideo = that.swiper.slides[
              that.swiper.activeIndex
            ].querySelector('.story--content.is-video')
            if (activeVideo) {
              activeVideo.play()
            }

            const prevVideo = that.swiper.slides[
              that.swiper.previousIndex
            ].querySelector('.story--content.is-video')
            if (prevVideo) {
              prevVideo.pause()
            }
          }
        }
      })

      // play initial slide
      const activeVideo = that.swiper.slides[
        that.swiper.activeIndex
      ].querySelector('.story--content.is-video')
      if (activeVideo) {
        activeVideo.play()
      }
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
  .swiper-pagination-bullet {
    width: rem(32px);
    border-radius: 0;
    height: rem(2px);
    background: $white;
    opacity: 0.5;
    margin: 0 rem(2px);
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
  }
}
.like-image {
  width: rem(32px);
  height: rem(32px);
}
.story--nav {
  top: 0;
  z-index: 10;
  width: 100%;
  max-width: 100%;
  .swiper-pagination {
    position: static;
  }
}
.story--nav-inner {
  width: rem(414px);
}
// .story--back {}
</style>
