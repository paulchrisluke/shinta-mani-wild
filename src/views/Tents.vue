<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild?node-id=553%3A4724 -->
  <div class="page page--tents">
    <div class="page--content">
      <!-- header -->
      <page-header :is-view-tents-visible="false"></page-header>

      <!-- player -->
      <div class="hero position-relative">
        <video-player
          v-if="resort.id"
          :source="resort.name"
          :poster="transformCloudinaryUrl(resort.featuredImage, `q_auto:good,w_${pageWidth},ar_${heroVideoRatio},c_fill,g_west`)"
          :rest="{autoplay: true, muted: false, loop: false}"
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
              :class-name="'h1 font-size-xl-huge text-dark text-center mb-5'"
              :border-art="true"
            ></base-heading>

            <div v-if="!resort.id">
              <content-placeholders centered rounded class="description-placeholder">
                <content-placeholders-text :lines="3" />
              </content-placeholders>
            </div>
            <p
              v-else
              class="mb-0"
              v-read-more="{lineHeight: 24, lines: 3, linkClass: 'd-block float-left'}"
              v-text="resort.description"
            ></p>
          </article>
        </div>

        <!-- accommodations -->
        <section class="container is-small mb-5 featured-items">
          <template v-if="!resort.id">
            <div class="row">
              <content-placeholders :class="`col-6 col-sm-${12 / 3}`" rounded v-for="item in 3" :key="item">
                <content-placeholders-img />
                <content-placeholders-text :lines="2" />
              </content-placeholders>
            </div>
          </template>
          <div v-else class="row">
            <div
              :class="`col-6 col-sm-${12 / 3}`"
              v-for="(item, index) in accommodationsAsStories.slice(0, 3)"
              :key="index"
            >
              <!-- NOTE: data has no video preview in this section -->
              <article-list-item
                :href="`/listing/${item.slug}`"
                :preview-transformations="'q_auto:low,e_preview:duration_8,w_212,c_fill,ar_1:1,ac_none'"
                :poster-transformations="'q_auto:best,w_288,h_192,c_fill,g_auto'"
                :image-box-class="'ratio-3-2'"
                :item="item"
              />
            </div>
          </div>
        </section>

        <!-- quote -->
        <section class="container is-small">
          <base-quote :show-placeholder="!resort.id" :class-name="'is-left'">
            <div class="quote" v-html="resort.h2"></div>
          </base-quote>
        </section>

        <template v-for="(doodle, index) in pageDoodles.slice(0, 2)">
          <img
            @load="setItemParallax($event)"
            :class="`doodle doodle-item-1-${index} position-absolute`"
            data-aos="fade-down"
            :data-rellax-speed="getRellaxSpeed()"
            :src="transformCloudinaryUrl(doodle.url, 'q_auto:low,fl_any_format,o_20,h_700,w_700,c_limit')"
            :key="index"
            alt
          />
        </template>
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
            <div class="column-12">
              <base-card :show-placeholder="!resort.id" :image="cardImage1">
                <template v-slot:text>
                  <div class="card-content">
                    <base-heading
                      :text="'All Inclusive'"
                      :type="'h2'"
                      :class-name="'h2 text-dark text-center text-xl-left'"
                    ></base-heading>
                    <p>Shinta Mani Wild is the full package - in every sense of the word. Our rates are inclusive of a round trip private car transfer to/from Phnom Penh or Sihanoukville Airport and vicinity, as well as your personal Bensley Butler, all meals and beverages, privately guided activities to explore the Cardamom forest, luxury spa treatments, WiFi throughout the camp and of course daily laundry service.</p>
                  </div>
                </template>
              </base-card>
            </div>
          </div>
        </div>

        <!-- Pure text -->
        <div class="container is-small px-5 mb-5">
          <article>
            <h2 class="h2 font-serif text-center mb-4 text-uppercase">Amenities and Treats</h2>
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
              <div class="col-3">
                <h3 class="h4 font-weight-light font-italic">Complimentary</h3>
                <ul class="list-unstyled">
                  <li>Toothbrush</li>
                  <li>Toothpaste</li>
                  <li>Hand sanitizer</li>
                  <li>Razor</li>
                  <li>Tissues</li>
                  <li>Comb</li>
                </ul>
              </div>
              <div class="col-3">
                <h3 class="h4 font-weight-light font-italic">Borrow</h3>
                <ul class="list-unstyled">
                  <li>Power adapter</li>
                  <li>Curling iron</li>
                  <li>Hair spray</li>
                  <li>Nail polish remover</li>
                  <li>Mosquito repellent</li>
                  <li>Sewing kit</li>
                  <li>Sunblock</li>
                </ul>
              </div>
              <div class="col-3">
                <h3 class="h4 font-weight-light font-italic">Purchase</h3>
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
            <div class="column-12">
              <base-card :show-placeholder="!resort.id" :image="cardImage2" :is-left="true">
                <template v-slot:text>
                  <div class="card-content">
                    <base-heading
                      :text="'Personal Bujler'"
                      :type="'h2'"
                      :class-name="'h2 text-dark text-center text-xl-left'"
                    ></base-heading>
                    <p>Great guests deserve great butlers — and you’ll find both here. Part guide, part friend, part valet, part mindreader: Shinta Mani Wild’s Bensley Butlers will anticipate your needs before you do.</p>
                    <p>They’ll suggest unforgettable activities to suit your tastes and fitness, and accompany you on your adventures, from motorbike rides to boat trips. Your butler will also play the classic role of butler with aplomb, unpacking and packing your luggage and fulfilling your ad-hoc requests.</p>
                    <p>Please note: although we understand the temptation, guests are not allowed to take their butler home.</p>
                  </div>
                </template>
              </base-card>
            </div>
          </div>
        </div>

        <template v-for="(doodle, index) in pageDoodles.slice(2, 5)">
          <img
            @load="setItemParallax($event)"
            :class="`doodle doodle-item-1-${index} position-absolute`"
            data-aos="fade-down"
            :data-rellax-speed="getRellaxSpeed()"
            :src="transformCloudinaryUrl(doodle.url, 'q_auto:low,fl_any_format,o_20,h_700,w_700,c_limit')"
            :key="index"
            alt
          />
        </template>
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
import { Story, Resort, Category } from '@/types'
import { get } from 'lodash-es'
import { categoryToStoryBridge } from '@/helpers'
import doodles from '@/mixins/doodles'

export default Vue.extend({
  name: 'listing',
  mixins: [doodles],
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
      slug: 'tents',
      featuredStoriesCount: 0
    }
  },
  computed: {
    resort(): Resort {
      return this.$store.getters['resort/getItem']
    },
    categories(): any {
      return this.$store.getters['category/getItems']
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
    cardImage1(): object | undefined {
      const image =
        'https://res.cloudinary.com/ddwsbpkzk/image/upload/v1567747072/Shinta%20Mani%20Wild/Tents/All_Inclusive_-_Tent_Page_Shinta_Mani_Wild_kdfq4g.jpg'
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
      const image =
        'https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568948083/Shinta%20Mani%20Wild/Tents/Head_Butler_Mac_-_Shinta_Mani_Wild_xxc4i9.jpg'
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
    }
  },
  mounted() {
    this.$store.dispatch('resort/getItemBySlug', this.slug)
    this.$store.dispatch('category/getItemsByName', 'accommodations')
  }
})
</script>

<style lang="scss" scoped>
.featured-items {
  min-height: rem(318px);
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
</style>
