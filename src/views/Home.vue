<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild -->

  <div class="page page--home">

    <div class="page--content">
      <!-- header -->
    <page-header></page-header>

    <!-- player -->
    <div @click="showIntroVideo()" :style="styleOfHero" :class="{ 'background-black': shouldShowIntroVideo, 'has-image background-black': resort.id && !shouldShowIntroVideo}" class="hero position-relative mb-5">
      <!-- https://www.youtube.com/watch?v=SUWpCjzeMb4 -->
      <video-player
        :show-placeholder="!resort.id"
        :is-visible="shouldShowIntroVideo"
        source="https://www.youtube.com/embed/SUWpCjzeMb4"
      ></video-player>
    </div>

    <div class="pattern-area-1 pt-5 pt-xl-0 position-relative">

      <div class="container is-small mb-4">
        <base-heading :class-placeholder="'is-huge-placeholder'" :show-placeholder="!resort.id" :text="'Shinta Mani Wild'" :type="'h1'" :class-name="'h1 is-huge text-dark text-center'" :border-art="true" ></base-heading>
      </div>

      <!-- quote -->
      <section class="container shift-down">
        <base-quote :show-placeholder="!resort.id" :class-name="'is-left'">
          <div class="quote w-100 h-100" v-html="resort.description"></div>
        </base-quote>
      </section>

      <!-- card -->
      <div class="container is-small">
        <div class="row mb-5">
          <div class="column-12">
            <base-card :show-placeholder="!resort.id" :image="cardImage1">
              <template v-slot:text>
                <div class="card-content">
                  <base-heading
                    :text="'All Inclusive'"
                    :type="'h2'"
                    :class-name="'h2 text-dark text-center text-xl-left'"
                    :border-dark="true"
                  ></base-heading>
                  <p>Shinta Mani Wild is a radical new fusion of world-class design, hospitality and conservation. The camp was born when world-renowned designer Bill Bensley identified an unprotected, 350-hectare wildlife corridor – and set out to save it from poaching, mining and logging. Sustainability informs everything we do, hence our partnership with the Wildlife Alliance (whose rangers have an onsite station), and our resident naturalists, who assist our chef. The Shinta Mani Foundation spearheads our conservation and community outreach programmes.</p>
                  <base-image-link :class-name="'is-primary is-md'" :href="resort.ctaLink" :text="'Book Now'"></base-image-link>
                </div>
              </template>
            </base-card>
          </div>
        </div>
      </div>

      <!-- banner action -->
      <div class="mb-5">
        <base-banner-action :image="resort.backgroundImage" :show-placeholder="!resort.id" :link="resort.ctaLink" :text="resort.ctaText">
        </base-banner-action>
      </div>

      <div class="pattern-area-2 position-relative">

      <!-- quote tents -->
      <div class="position-relative">
        <section class="container">
          <base-quote :show-placeholder="!resort.id" :class-name="'is-right'">
            <div class="quote w-100 h-100" v-html="resort.h2"></div>
          </base-quote>
        </section>
      </div>

      <!-- gallery -->
      <div class="mb-5">
        <base-heading :text="'Our Tents'" :type="'h2'" :class-name="'h1 text-dark text-center'" :border-art="true"></base-heading>
        <base-gallery-list :show-placeholder="!resort.id" :items="galleryItems.slice(0,2)" />
      </div>

      <!-- press banner -->
      <div class="mb-5">
        <section class="press-banner">
          <a href="/search/press" target="_blank" class="press-banner--link d-block h-100" title="Press" aria-label="Press"></a>
        </section>
      </div>

      </div>

      <!-- card -->
      <div class="container is-small">
        <div class="row mb-5">
          <div class="column-12">
            <base-card :show-placeholder="!resort.id" :image="cardImage2" :is-left="true">
              <template v-slot:text>
                <div class="card-content">
                  <base-heading
                    :text="'Conservation'"
                    :type="'h2'"
                    :class-name="'h2 text-dark text-center text-xl-left'"
                    :border-dark="true"
                  ></base-heading>
                  <p>Shinta Mani Wild is a radical new fusion of world-class design, hospitality and conservation. The camp was born when world-renowned designer Bill Bensley identified an unprotected, 350-hectare wildlife corridor – and set out to save it from poaching, mining and logging. Sustainability informs everything we do, hence our partnership with the Wildlife Alliance (whose rangers have an onsite station), and our resident naturalists, who assist our chef. The Shinta Mani Foundation...</p>
                  <div class="d-flex">
                    <base-image-link :class-name="'is-primary is-md ml-xl-auto'" :href="resort.ctaLink" :text="'Book Now'"></base-image-link>
                  </div>
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
import BaseImageLink from '@/components/BaseImageLink.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBannerAction from '@/components/BaseBannerAction.vue'
import BaseQuote from '@/components/BaseQuote.vue'
import BaseGalleryList from '@/components/BaseGalleryList.vue'
import PageFooter from '@/components/PageFooter.vue'
import { Resort, ResortImage } from '@/types.ts'
import { get } from 'lodash-es'

export default Vue.extend({
  name: 'home',
  components: {
    PageHeader,
    VideoPlayer,
    BaseCard,
    BaseImageLink,
    BaseHeading,
    BaseQuote,
    BaseBannerAction,
    BaseGalleryList,
    PageFooter
  },
  data() {
    return {
      shouldShowIntroVideo: false
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    galleryItems(): object[] {
      return [
        {
          url: this.getResortImage(2),
          link: '/listing/wild-tents',
          title: 'Wild<br>Tents',
        },
        {
          url: this.getResortImage(3),
          link: '/listing/waterfall-tents',
          title: 'Waterfall<br>Tents'
        }
      ]
    },
    resort(): Resort {
      return this.$store.getters['resort/getResort']
    },
    styleOfHero(): any {
      return {
        backgroundImage: !this.shouldShowIntroVideo ? `url(${this.resort.featuredImage})` : 'none'
      }
    },
    cardImage1(): object | undefined {
      const image = this.getResortImage(1)
      if (!image) {
        return
      }
      return {
        alt: 'All Inclusive',
        xl: {
          src: image
        },
        default: {
          src: image
        }
      }
    },
    cardImage2(): object | undefined {
      const image = this.getResortImage(4)
      if (!image) {
        return
      }
      return {
        alt: 'Conservation',
        xl: {
          src: image
        },
        default: {
          src: image
        }
      }
    },
  },
  methods: {
    init() {
      this.$store.dispatch('resort/getItemBySlug', 'home')
    },
    showIntroVideo() {
      this.shouldShowIntroVideo = true
    },
    getResortImage(order: number): string | undefined {
      const images = get(this.resort, 'images', []);
      const resultImage = images.find((item: ResortImage) => item.order === order);
      if (!resultImage) {
        return
      }
      return resultImage.url
    }
  }
})
</script>

<style lang="scss" scoped>
.hero {
  height: rem($hero-height);
  &.background-black {
    background: $black;
  }
  &.has-image {
    box-shadow: $box-shadow-md, $box-shadow-sm;
    @include media-breakpoint-up(xl) {
      background: no-repeat center bottom;
      background-size: cover;
    }
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

  iframe {
    max-width: 100%;
    max-height: calc(100vh - #{$header-height});
  }

  ::v-deep {
    @include hero-placeholder($hero-height);
  }
}
.pattern-area-1 {
  @include media-breakpoint-up(xl) {
    background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1566989132/Shinta%20Mani%20Wild/home/Tigers1_ikytxj.png') no-repeat top left, url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1566989132/Shinta%20Mani%20Wild/home/Tigers2_r3lhhp.png') no-repeat top right;
    background-size: 28%;
  }
}
.pattern-area-2 {
  @include media-breakpoint-up(xl) {
    // background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1566987433/Shinta%20Mani%20Wild/home/gibbon1_mbh3bg.png') no-repeat top right 5%;
  }
}
.press-banner {
  height: rem(300px);
}
.press-banner--link {
  background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1567397036/Shinta%20Mani%20Wild/home/Press_Banner_lvzdtx.jpg') center repeat-x;
  background-size: auto 100%;
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