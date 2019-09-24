<template>
  <div class="swiper-container">
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

          <div
            class="story--details position-absolute px-3 d-flex align-items-center justify-content-center"
          >
            <p
              class="story--title flex-grow-1 text-left text-small-caps text-light mb-0"
              v-text="item.ctaText"
            ></p>
            <!-- like -->
            <a @click.stop.prevent class="like ml-3" href="#">
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
    <!-- Pagination -->
    <div class="story--nav d-flex position-absolute">
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
    </div>
    <!-- Navigation -->
    <div class="swiper-button-next swiper-button-white"></div>
    <div class="swiper-button-prev swiper-button-white"></div>
  </div>
</template>

<script lang='ts'>
// @ts-ignore
import Swiper from 'swiper'
import '@/styles/lib-swiper.scss'

import Vue from 'vue'
export default Vue.extend({
  name: 'story-slider',
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  watch: {
    items() {
      // @ts-ignore
      this.$nextTick(this.initSlider)
    }
  },
  methods: {
    onClickBack() {
      this.$emit('on-click-back')
    },
    initSlider(): void {
      var swiper = new Swiper('.swiper-container', {
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
            const activeVideo = swiper.slides[swiper.activeIndex].querySelector(
              '.story--content.is-video'
            )
            if (activeVideo) {
              activeVideo.play()
            }

            const prevVideo = swiper.slides[swiper.previousIndex].querySelector(
              '.story--content.is-video'
            )
            if (prevVideo) {
              prevVideo.pause()
            }
          }
        }
      })

      // play initial slide
      const activeVideo = swiper.slides[swiper.activeIndex].querySelector(
        '.story--content.is-video'
      )
      if (activeVideo) {
        activeVideo.play()
      }
    }
  }
})
</script>

<style lang='scss' scoped>
.swiper-container {
  width: 100%;
  @include media-breakpoint-up(lg) {
    max-height: rem(604px);
  }
}
.swiper-slide {
  transition: transform 300ms ease, opacity 300ms ease;
  opacity: 0.7;
}
.swiper-slide-active {
  transform: scale(1);
  opacity: 1;
}
.story--content {
  // background-color: rgba($brand-2, 0.4);
  // background-color: $brand-2;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
}
.story--inner {
  max-width: 414px;
  max-height: 100%;
}
.story--details {
  right: 0;
  left: 0;
  bottom: 0;
  min-height: rem(96px);
  padding-bottom: rem(32px);
  background: $easing-gradient-lg;
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
  width: rem(414px)
}
// .story--back {}
</style>
