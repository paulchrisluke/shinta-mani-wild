<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild?node-id=553%3A4724 -->
  <div class="page page--listing">
    <div class="page--header-content">
      <!-- header -->
      <page-header></page-header>

      <loading-progress />

      <div class="page--content">

      <!-- player -->
      <div class="hero position-relative">
        <video-player
          v-if="resort.id"
          :source="resort.name"
          :rest="{autoplay: true, loop: false}"
        ></video-player>
      </div>

      <div class="parallax-container position-relative py-5">
        <div class="container is-small page-description clearfix mb-5">
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
            <p
              v-else
              class="mb-0"
              v-text="resort.description"
            ></p>
          </article>
        </div>

        <!-- gallery -->
        <section>
          <base-heading :text="'Gallery'" :type="'h2'" :class-name="'h2 text-dark text-center'"></base-heading>
          <base-gallery-list :items="galleryItems.slice(0,2)" />
        </section>

        <template v-for="(doodle, index) in pageDoodles.slice(0, 2)">
          <img
            @load="setItemParallax($event)"
            :class="`doodle doodle-item-0-${index} position-absolute`"
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
          :button-text="'Book Now'"
        ></base-banner-action>
      </div>

      <div class="parallax-container position-relative py-5">
        <div class="container is-small">
          <!-- quote -->
          <section class="container mb-5">
            <base-quote :type="'grass1'">
              <div class="quote" v-html="resort.h2"></div>
            </base-quote>
          </section>
        </div>

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
        <div class="container is-small mb-5">
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
  
        <!-- articles (stories) -->
        <div class="container is-small">
          <base-heading
            :show-placeholder="!resort.id"
            :class-placeholder="'mb-4'"
            :type="'h2'"
            :class-name="'h2 text-dark text-center'"
            :text="`Explore our ${resort.title}`"
          ></base-heading>
          <base-articles-list
            :route-props="{ returnTo: 'listing', resortId: $route.params.id }"
            :show-placeholder="!resort.id"
            :items="stories"
            preview-transformations="q_auto:low,e_preview:duration_8,w_212,c_fill,ar_1:1,ac_none"
            poster-transformations="q_auto:best,w_212,h_212,c_fill,g_auto"
          ></base-articles-list>
        </div>

        <template
          v-for="(doodle, index) in pageDoodles.slice(2, (relativeDoodleAmount(stories.length, featuredStoriesCount, 2) || 4))"
        >
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
    
    <booking-bar :title="resort.title" :price="1200"></booking-bar>
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
import BaseGalleryList from '@/components/BaseGalleryList.vue'
import BaseBannerAction from '@/components/BaseBannerAction.vue'
import BaseArticlesList from '@/components/BaseArticlesList.vue'
import BaseQuote from '@/components/BaseQuote.vue'
import BookingBar from '@/components/BookingBar.vue'
import loading from '@/mixins/loading'
import doodles from '@/mixins/doodles'
import { GalleryImage, Story, Resort } from '@/types'
import { get } from 'lodash-es'
import { MetaInfo } from 'vue-meta'
import BaseCard from '@/components/BaseCard.vue'

export default Vue.extend({
  name: 'listing',
  mixins: [doodles, loading],
  components: {
    PageHeader,
    VideoPlayer,
    PageFooter,
    HeroImage,
    BaseHeading,
    BaseGalleryList,
    BaseBannerAction,
    BaseArticlesList,
    BaseQuote,
    BookingBar,
    BaseCard
  },
  data() {
    return {
      slug: this.$route.params.id,
      featuredStoriesCount: 0,
      cardImage1: {
        text: 'All Inclusive',
        url: "https://res.cloudinary.com/ddwsbpkzk/image/upload/v1567747072/Shinta%20Mani%20Wild/Tents/All_Inclusive_-_Tent_Page_Shinta_Mani_Wild_kdfq4g.jpg"
      },
      cardImage2: {
        text: 'Conservation',
        url: "https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568948083/Shinta%20Mani%20Wild/Tents/Head_Butler_Mac_-_Shinta_Mani_Wild_xxc4i9.jpg"
      }
    }
  },
  metaInfo (): MetaInfo {
    return {
      title: (this as any).resort.title,
      meta: [
        { vmid: 'description', name: 'description', content: (this as any).resort.description }
      ]
    }
  },
  computed: {
    resort(): Resort {
      return this.$store.getters['resort/getItem']
    },
    stories(): Story[] {
      return get((this as any).resort, 'stories', []).filter(
        (item: Story) => item.posterUrl
      )
    },
    resortImages(): GalleryImage[] {
      return get((this as any).resort, 'images', [])
    },
    galleryItems() {
      const images = (this as any).resortImages
      if (images.length === 0) {
        return []
      }

      const slug = (this as any).slug
      const items = [
        {
          link: `/gallery/${slug}/3?returnTo=listing`,
          title: 'Exterior',
          url: get(images, '[0].url', '')
        },
        {
          link: `/gallery/${slug}/4?returnTo=listing`,
          title: 'Interior',
          url: get(images, '[1].url', '')
        }
      ]
      return items
    }
  },
  mounted() {
    this.$store.dispatch('resort/getItemBySlug', (this as any).slug)
  }
})
</script>
