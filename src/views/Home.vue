<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild -->

  <div class="page page--home">

    <div class="page--content">
      <!-- header -->
    <page-header></page-header>

    <!-- player -->
    <div @click="showIntroVideo()" :class="{'has-image': !shouldShowIntroVideo}" :style="getHeroStyle()" class="hero position-relative">
      <!-- https://www.youtube.com/watch?v=SUWpCjzeMb4 -->
      <video-player
        :is-visible="shouldShowIntroVideo"
        source="https://www.youtube.com/embed/SUWpCjzeMb4"
      ></video-player>
    </div>

    <div class="pattern-area-1 pt-5 pt-xl-2 position-relative">

      <!-- quote -->
      <div class="shift-down position-relative">
        <base-heading :text="'Shinta Mani Wild'" :type="'h1'" :class-name="'h1 text-dark text-center'" :border-art="true" ></base-heading>

        <section class="container">
          <base-quote :class-name="'is-left'">
            <div class="quote w-100" v-html="resort.ctaText"></div>
          </base-quote>
        </section>
      </div>

      <!-- card -->
      <div class="container is-small">
        <div class="row mb-5">
          <div class="column-12">
            <base-card :image="cardImage1">
              <template v-slot:text>
                <div class="card-content">
                  <base-heading
                    :text="'All Inclusive'"
                    :type="'h2'"
                    :class-name="'h2 text-dark text-center text-xl-left'"
                    :border-dark="true"
                  ></base-heading>
                  <p>Shinta Mani Wild is a radical new fusion of world-class design, hospitality and conservation. The camp was born when world-renowned designer Bill Bensley identified an unprotected, 350-hectare wildlife corridor – and set out to save it from poaching, mining and logging. Sustainability informs everything we do, hence our partnership with the Wildlife Alliance (whose rangers have an onsite station), and our resident naturalists, who assist our chef. The Shinta Mani Foundation spearheads our conservation and community outreach programmes.</p>
                  <base-button @click="bookNow" :text="'Book Now'"></base-button>
                </div>
              </template>
            </base-card>
          </div>
        </div>
      </div>

      <!-- banner action -->
      <div class="mb-5">
        <base-banner-action :video="resort.backgroundImage">
          <h2 class="h1 text-uppercase font-serif text-light">
              <div class="mb-3">
                <div>Adventures</div>
                <div class="border-bottom border-light pb-3 d-table">Await<small class="font-sans-serif">...</small></div>
              </div>
          </h2>
        </base-banner-action>
      </div>

      <!-- quote tents -->
      <div class="position-relative">
        <base-heading :text="'Our Tents'" :type="'h2'" :class-name="'h1 text-dark text-center'" :border-art="true"></base-heading>

        <section class="container">
          <base-quote :class-name="'is-right'">
            <div class="quote w-100">
              <p
              >“I discovered a version of luxury travel I could live with: a rare and extravagant feast of the senses hidden deep within the jungle; an unexpected, delightful conversation named Shinta Mani Wild…”</p>
              <b>Charles Graeber, Travel+Leisure - The IT List 2019</b>
            </div>
          </base-quote>
        </section>
      </div>

      <!-- gallery -->
      <div class="mb-5">
        <base-gallery-list :items="galleryItems" />
      </div>

      <!-- press banner -->
      <div class="mb-5">
        <section class="press-banner">
          <a class="press-banner--link d-block h-100" href=""></a>
        </section>
      </div>

      <!-- card -->
      <div class="container is-small">
        <div class="row mb-5">
          <div class="column-12">
            <base-card :image="cardImage1" :is-left="true">
              <template v-slot:text>
                <div class="card-content">
                  <base-heading
                    :text="'Conservation'"
                    :type="'h2'"
                    :class-name="'h2 text-dark text-center text-xl-left'"
                    :border-dark="true"
                  ></base-heading>
                  <p>Shinta Mani Wild is a radical new fusion of world-class design, hospitality and conservation. The camp was born when world-renowned designer Bill Bensley identified an unprotected, 350-hectare wildlife corridor – and set out to save it from poaching, mining and logging. Sustainability informs everything we do, hence our partnership with the Wildlife Alliance (whose rangers have an onsite station), and our resident naturalists, who assist our chef. The Shinta Mani Foundation...</p>
                  <base-button :class-name="'ml-xl-auto'" @click="bookNow" :text="'Book Now'"></base-button>
                </div>
              </template>
            </base-card>
          </div>
        </div>
      </div>

    </div>
    </div>

    <page-footer></page-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBannerAction from '@/components/BaseBannerAction.vue'
import BaseQuote from '@/components/BaseQuote.vue'
import BaseGalleryList from '@/components/BaseGalleryList.vue'
import PageFooter from '@/components/PageFooter.vue'
const cardImage = require('@/assets/media/home-card-1.jpg')
const cardImageXs = require('@/assets/media/home-card-1--mobile.jpg')

export default Vue.extend({
  name: 'home',
  components: {
    PageHeader,
    VideoPlayer,
    BaseCard,
    BaseButton,
    BaseHeading,
    BaseQuote,
    BaseBannerAction,
    BaseGalleryList,
    PageFooter
  },
  data() {
    return {
      shouldShowIntroVideo: false,
      cardImage1: {
        alt: 'All Inclusive',
        xl: {
          src: cardImage
        },
        default: {
          src: cardImageXs
        }
      },
      galleryItems: [
        {
          url: 'http://placehold.it/440x320/3D5200',
          link: '/listing/wild-tents',
          title: 'Wild<br>Tents',
        },
        {
          url: 'http://placehold.it/440x320/3D5200',
          link: '/listing/waterfall-tents',
          title: 'Waterfall<br>Tents'
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    resort(): any {
      return this.$store.getters['resort/getResort']
    }
  },
  methods: {
    init() {
      this.$store.dispatch('resort/getItemBySlug', 'home')
    },
    showIntroVideo() {
      this.shouldShowIntroVideo = true
    },
    getHeroStyle() {
      if (!this.shouldShowIntroVideo) {
        return {
          'background-image': `url(${this.resort.featuredImage})`
        }
      }
      return {}
    },
    bookNow() {
      console.log('book now...')
    }
  }
})
</script>

<style lang="scss" scoped>
.hero {
  box-shadow: $box-shadow-md, $box-shadow-sm;
  background: $black;
  iframe {
    max-width: 100%;
    max-height: calc(100vh - #{$header-height});
  }

  &.has-image {
    background-size: cover;
    background-repeat: no-repeat;
    height: rem(800px - $header-height);
    cursor: pointer;
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: '';
      display: block;
      background: $linear-gradient-md;
    }
  }
}
.card-content::v-deep .button-frame {
  $button-width: 172px;
  $button-height: 72px;
  width: rem($button-width);
  height: rem($button-height);
  background: url('~@/assets/img/button-book-now.png');
  background-size: rem($button-width $button-height);
}
.pattern-area-1 {
  @include media-breakpoint-up(xl) {
    &::before {
      content: '';
      display: block;
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: url('~@/assets/media/home/tigers1-fill.png') no-repeat top;
      background-size: 100%;
    }
  }
}
.shift-down {
  @include media-breakpoint-up(xl) {
    top: rem(40px);
  }
}
.press-banner {
  height: rem(227px);
  box-shadow: 0 6px 8px rgba($black, 0.2), 0 -2px 8px rgba($black, 0.05);
}
.press-banner--link {
  background: url('~@/assets/media/home/press-banner.png') left;
}
.quote::v-deep {
  p {
    margin-bottom: 0;
    font-style: italic;
    font-weight: 300;
  }
  b {
    font-weight: bold;
    display: block;
  }
}
</style>