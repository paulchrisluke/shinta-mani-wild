<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild?node-id=553%3A4724 -->
  <div class="page page--tents">
    <div class="page--header-content">
      <!-- header -->
      <page-header></page-header>

      <loading-progress />

      <!-- player -->
      <div class="hero position-relative">
        <video-player
          v-if="resort.id"
          :source="resort.name"
          :rest="{autoplay: true, loop: true}"
          :video-transformations="'q_auto:best'"
        ></video-player>
      </div>

      <div class="parallax-container position-relative py-5">
        <div class="container is-small mb-5 page-description clearfix mb-4">
          <article>
            <base-heading
              :show-placeholder="!resort.id"
              :text="resort.title"
              :type="'h1'"
              :class-placeholder="'heading-placeholder mb-5'"
              :class-name="'h1 text-dark text-center mb-5'"
              :border-art="true"
            ></base-heading>

            <div v-if="!resort.id">
              <content-placeholders centered rounded class="description-placeholder">
                <content-placeholders-text :lines="3" />
              </content-placeholders>
            </div>
            <p v-else class="mb-0" v-text="resort.description"></p>
          </article>
        </div>

        <!-- accommodations -->
        <section class="container is-small mb-5 featured-items">
          <div class="swiper-container">
            <div ref="swiper-wrapper" class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in accommodationsAsStories.slice(0, 3)"
                :key="index"
              >
                <article-list-item
                  :title-class="'font-weight-normal'"
                  :href="`/listing/${item.slug}`"
                  :preview-transformations="'q_auto:low,e_preview:duration_8,w_212,c_fill,ar_1:1,ac_none'"
                  :poster-transformations="'q_auto:best,w_288,h_192,c_fill,g_auto'"
                  :image-box-class="'ratio-3-2'"
                  :key="`tent${index}`"
                  :item="item"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- quote -->
        <section class="container is-small">
          <base-quote :type="'grass1'">
            <div class="quote h-100" v-html="resort.h2"></div>
          </base-quote>
        </section>

        <div
          :class="`doodle doodle-item-1-${index} position-absolute`"
          :key="index"
          v-for="(doodle, index) in pageDoodles.slice(0, 2)"
        >
          <img
            @load="setItemParallax($event)"
            data-aos="fade-down"
            :data-rellax-speed="getRellaxSpeed()"
            :src="transformCloudinaryUrl(doodle.url, 'q_auto:low,fl_any_format,o_20,h_700,w_700,c_limit')"
            alt
          />
        </div>
      </div>

      <!-- banner action -->
      <div>
        <base-banner-action
          :image="resort.backgroundImage"
          :show-placeholder="!resort.id"
          :link="resort.ctaLink"
          :text="resort.ctaText"
          :button-text="'Find Out'"
        ></base-banner-action>
      </div>

      <div class="parallax-container position-relative py-5">
        <!-- card -->
        <div class="container is-small">
          <div class="row mb-5">
            <div class="col-12">
              <base-card :show-placeholder="!resort.id" :image="cardImage1">
                <template v-slot:text>
                  <div class="card-content">
                    <h2
                      class="base-heading font-weight-normal h2 mb-3 text-dark text-center text-xl-left"
                    >All Inclusive</h2>
                    <p>Shinta Mani Wild is the full package - in every sense of the word. Our rates are inclusive of a round trip private car transfer to/from Phnom Penh or Sihanoukville Airport and vicinity, as well as your personal Bensley Butler, all meals and beverages, privately guided activities to explore the Cardamom forest, luxury spa treatments, WiFi throughout the camp and of course daily laundry service.</p>
                  </div>
                </template>
              </base-card>
            </div>
          </div>
        </div>

        <!-- Pure text -->
        <div class="container is-small mb-5">
          <article>
            <h2 class="h2 text-center mb-4">Amenities and Treats</h2>
            <p>
              The bedrooms of your tent are climate controlled, your Butler
              will show you the controls. For a more intimate jungle experience
              on cooler evenings open the windows (leave the screens down)
              and shut off your AC.
            </p>
            <p class="mb-5">
              In an effort to reduce waste in such a pristine part of the world,
              amenities such as a toothbrushes, soap or shampoo will not be
              kept in your tent. However should you need them, please do not
              hesitate to let your Adventure Butler know.
              Have you forgotten to pack an important item? For your
              convenience, we offer the following essentials to you with our
              compliments, as well as variety of items for you to purchase or
              borrow during your stay. Please contact the Bensley Butlers, and
              we will deliver the requested item(s) to your tent.
            </p>

            <div class="row justify-content-center">
              <div class="col-12 col-md-3">
                <h3 class="h4 font-weight-light font-italic mb-1">Complimentary</h3>
                <ul class="list-unstyled page-tents--list-items">
                  <li>Toothbrush</li>
                  <li>Toothpaste</li>
                  <li>Hand sanitizer</li>
                  <li>Razor</li>
                  <li>Tissues</li>
                  <li>Comb</li>
                </ul>
              </div>
              <div class="col-12 col-md-3">
                <h3 class="h4 font-weight-light font-italic mb-1">Borrow</h3>
                <ul class="list-unstyled page-tents--list-items">
                  <li>Power adapter</li>
                  <li>Curling iron</li>
                  <li>Hair spray</li>
                  <li>Nail polish remover</li>
                  <li>Mosquito repellent</li>
                  <li>Sewing kit</li>
                  <li>Sunblock</li>
                </ul>
              </div>
              <div class="col-12 col-md-3">
                <h3 class="h4 font-weight-light font-italic mb-1">Purchase</h3>
                <ul class="list-unstyled">
                  <li>Deodorant</li>
                  <li>Sanitary Supplies</li>
                </ul>
              </div>
            </div>
          </article>
        </div>

        <!-- card -->
        <div class="container is-small">
          <div class="row">
            <div class="col-12">
              <base-card :show-placeholder="!resort.id" :image="cardImage2" :is-left="true">
                <template v-slot:text>
                  <div class="card-content">
                    <h2
                      class="base-heading font-weight-normal h2 mb-3 text-dark text-center text-xl-left"
                    >Personal Butler</h2>
                    <p>Great guests deserve great butlers — and you’ll find both here. Part guide, part friend, part valet, part mindreader: Shinta Mani Wild’s Bensley Butlers will anticipate your needs before you do.</p>
                    <p>They’ll suggest unforgettable activities to suit your tastes and fitness, and accompany you on your adventures, from motorbike rides to boat trips. Your butler will also play the classic role of butler with aplomb, unpacking and packing your luggage and fulfilling your ad-hoc requests.</p>
                    <p>Please note: although we understand the temptation, guests are not allowed to take their butler home.</p>
                  </div>
                </template>
              </base-card>
            </div>
          </div>
        </div>

        <div
          :class="`doodle doodle-item-1-${index} position-absolute`"
          :key="index"
          v-for="(doodle, index) in pageDoodles.slice(2, 5)"
        >
          <img
            @load="setItemParallax($event)"
            data-aos="fade-down"
            :data-rellax-speed="getRellaxSpeed()"
            :src="transformCloudinaryUrl(doodle.url, 'q_auto:low,fl_any_format,o_20,h_700,w_700,c_limit')"
            alt
          />
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
import PageFooter from '@/components/PageFooter.vue'
import HeroImage from '@/components/HeroImage.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseBannerAction from '@/components/BaseBannerAction.vue'
import BaseQuote from '@/components/BaseQuote.vue'
import articleListItem from '@/components/BaseArticleListItem.vue'
import doodles from '@/mixins/doodles'
import loading from '@/mixins/loading'
import { Story, Resort, Category, GalleryImage } from '@/types'
import { get } from 'lodash-es'
import { categoryToStoryBridge } from '@/helpers'
import store from '@/store'
import { MetaInfo } from 'vue-meta'
import Swiper from 'swiper'
import '@/styles/lib-swiper.scss'

export default Vue.extend({
  name: 'listing',
  mixins: [doodles, loading],
  components: {
    PageHeader,
    VideoPlayer,
    PageFooter,
    HeroImage,
    BaseHeading,
    BaseBannerAction,
    BaseQuote,
    BaseCard,
    articleListItem
  },
  data() {
    return {
      swiper: {} as Swiper
    }
  },
  computed: {
    resort(): Resort {
      return store.getters['resort/getItem']
    },
    cardImages(): GalleryImage[] {
      const OrderOfCardsImages = 4
      return get(this.resort, 'images', []).filter(
        item => item.order === OrderOfCardsImages
      )
    },
    categories(): any {
      return store.getters['category/getItems']
    },
    accommodations(): Category[] {
      return get(this.categories, 'accommodations', [])
    },
    accommodationsAsStories(): Object[] {
      return this.accommodations.map((category, index) => {
        return {
          ...categoryToStoryBridge(category),
          posterUrl: get(this.resort, `images[${index}].url`, ''),
          slug: category.slug
        }
      })
    },
    cardImage1(): object | null {
      if (this.cardImages.length < 1) {
        return null
      }
      return {
        text: 'All Inclusive',
        url: this.cardImages[0].url
      }
    },
    cardImage2(): object | null {
      if (this.cardImages.length < 1) {
        return null
      }
      return {
        text: 'Conservation',
        url: this.cardImages[1].url
      }
    }
  },
  watch: {
    accommodationsAsStories() {
      this.$nextTick(this.initSlider)
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.init()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      store.dispatch('resort/getItemBySlug', 'tents')
      store.dispatch('category/getItemsByName', 'accommodations')
    },
    initSlider(): void {
      this.swiper = new Swiper('.swiper-container', {
        slidesPerView: 1.2,
        spaceBetween: 30,
        loop: false,
        breakpoints: {
          576: {
            slidesPerView: 2.2
          }
        }
      })
    }
  },
  metaInfo(): MetaInfo {
    return {
      title: this.resort.title,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.resort.description
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.featured-items {
  @include media-breakpoint-up(md) {
    min-height: rem(318px);
  }
  &::v-deep {
    .vue-content-placeholders-img {
      height: rem(192px);
    }
  }
}
.page--tents::v-deep {
  .card-image img {
    width: rem(384px);
  }
}
.page-tents--list-items {
  @include media-breakpoint-down(sm) {
    column-count: 2;
    max-width: rem(420px);
  }
}

// override doodles positions
.doodle-item-1-0 {
  top: -30vh;
}
</style>
