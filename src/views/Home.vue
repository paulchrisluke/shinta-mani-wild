<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild -->

  <div class="page page--home">
    <div class="page--header-content">
      <!-- header -->
      <page-header></page-header>

      <loading-progress />

      <div class="page--content">

      <!-- player -->
      <div class="hero position-relative">
        <video-player
          v-if="resort.id"
          :source="transformCloudinaryUrl(resort.name, 'q_auto')"
          :rest="{autoplay: true, loop: false}"
        ></video-player>
      </div>

      <div class="parallax-container position-relative py-5">
        <div class="container is-small mb-4">
          <base-heading
            :class-placeholder="'is-huge-placeholder'"
            :show-placeholder="!resort.id"
            :text="'Shinta Mani Wild'"
            :type="'h1'"
            :class-name="'h1 font-size-xl-huge text-dark text-center'"
            :border-art="true"
          ></base-heading>
        </div>

        <!-- quote -->
        <section class="container is-small home--quote-wrapper mb-5">
          <base-quote :type="'grass1'">
            <div class="quote" v-html="resort.description"></div>
          </base-quote>
        </section>

        <!-- card -->
        <div class="container is-small">
          <div class="row">
            <div class="col-12">
              <base-card :show-placeholder="!resort.id" :image="cardImage1">
                <template v-slot:text>
                  <div class="card-content">
                    <h2
                      class="base-heading text-small-caps font-sans-serif font-weight-normal h2 mb-3 text-dark text-center text-xl-left"
                    >All Inclusive</h2>
                    <p
                      class="mb-xl-6"
                    >Shinta Mani Wild is the full package - in every sense of the word. Our rates are inclusive of a round trip private car transfer to/from Phnom Penh or Sihanoukville Airport and vicinity, as well as your personal Bensley Butler, all meals and beverages, privately guided activities to explore the Cardamom forest, luxury spa treatments, WiFi throughout the camp and of course daily laundry service.</p>
                    <base-image-link
                      :theme="'primary'"
                      :size="'md'"
                      :text="'Book Now'"
                      :href="cloudbedsBookingLink"
                    ></base-image-link>
                  </div>
                </template>
              </base-card>
            </div>
          </div>
        </div>

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
        <!-- quote -->
        <div class="position-relative home--quote-wrapper mb-5">
          <section class="container is-small">
            <base-quote :class-name="'is-right'">
              <div class="quote" v-html="resort.h2"></div>
            </base-quote>
          </section>
        </div>

        <!-- gallery -->
        <div>
          <base-heading
            :text="'Our Tents'"
            :type="'h2'"
            :class-name="'h1 text-dark text-center'"
            :border-art="true"
          ></base-heading>
          <base-gallery-list :show-placeholder="!resort.id" :items="galleryItems.slice(0,2)" />
        </div>

        <template v-for="(doodle, index) in pageDoodles.slice(2, 4)">
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

      <!-- press banner -->
      <div>
        <section class="press-banner mx-auto">
          <a
            href="/search/press"
            target="_blank"
            class="press-banner--link d-block"
            title="Press"
            aria-label="Press"
          >
            <picture>
              <source v-for="size in gridBreakpointsArray" :key="size" :media="`(max-width: ${size}px)`" :srcset="transformCloudinaryUrl(pressBannerImage, `w_${size},q_auto:best`)">
              <img class="w-100" :src="transformCloudinaryUrl(pressBannerImage, 'q_auto:best')" alt="Shinta Mani Wild in Press">
            </picture>
          </a>
        </section>
      </div>

      <div class="parallax-container position-relative py-5">
        <!-- card -->
        <div class="container is-small">
          <div class="row">
            <div class="col-12">
              <base-card :show-placeholder="!resort.id" :image="cardImage2" :is-left="true">
                <template v-slot:text>
                  <div class="card-content">
                    <h2
                      class="base-heading text-small-caps font-sans-serif font-weight-normal h2 mb-3 text-dark text-center text-xl-left"
                    >Conservation</h2>
                    <p>The camp was born when world-renowned designer Bill Bensley identified an unprotected, 350-hectare wildlife corridor – and set out to save it from poaching, mining and logging. A radical new fusion of world-class design, hospitality and conservation! Sustainability informs everything we do, hence our partnership with the Wildlife Alliance (whose rangers have an onsite station), and our resident naturalists, who assist our chef. Join us on the front line of Conservation, and see your stay make a difference to protecting the lungs of Cambodia and it’s many unique and endangered species.</p>
                    <div class="d-flex">
                      <base-image-link
                        :class-name="'ml-xl-auto'"
                        :theme="'primary'"
                        :size="'md'"
                        :text="'Book Now'"
                        :href="cloudbedsBookingLink"
                      ></base-image-link>
                    </div>
                  </div>
                </template>
              </base-card>
            </div>
          </div>
        </div>

        <template v-for="(doodle, index) in pageDoodles.slice(4, 6)">
          <img
            @load="setItemParallax($event)"
            :class="`doodle doodle-item-2-${index} position-absolute`"
            data-aos="fade-down"
            :data-rellax-speed="getRellaxSpeed()"
            :src="transformCloudinaryUrl(doodle.url, 'q_auto:good,o_20')"
            :key="index"
            alt
          />
        </template>
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
import loading from '@/mixins/loading'
import doodles from '@/mixins/doodles'
import { Resort, ResortImage, GalleryImage } from '@/types.ts'
import { get } from 'lodash-es'

export default Vue.extend({
  name: 'home',
  mixins: [doodles, loading],
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
      startedPlaying: false,
      pressBannerImage: 'https://res.cloudinary.com/ddwsbpkzk/image/upload/v1567397036/Shinta%20Mani%20Wild/home/Press_Banner_lvzdtx.jpg'
    }
  },
  mounted() {
    this.$store.dispatch('resort/getItemBySlug', 'home')
  },
  metaInfo () {
    return {
      title: this.resort.title,
      meta: [
        { vmid: 'description', name: 'description', content: this.resort.description }
      ]
    }
  },
  computed: {
    galleryItems(): object[] {
      return [
        {
          url: this.getResortImage(2),
          link: '/listing/wild-tents',
          title: 'Wild<br>Tents'
        },
        {
          url: this.getResortImage(3),
          link: '/listing/waterfall-tents',
          title: 'Waterfall<br>Tents'
        }
      ]
    },
    resort(): Resort {
      return this.$store.getters['resort/getItem']
    },
    cardImage1(): object | undefined {
      const image = this.getResortImage(1)
      if (!image) {
        return
      }
      return {
        text: 'All Inclusive',
        url: image
      }
    },
    cardImage2(): object | undefined {
      const image = this.getResortImage(4)
      if (!image) {
        return
      }
      return {
        text: 'Conservation',
        url: image
      }
    }
  },
  methods: {
    getResortImage(order: number): string | undefined {
      const images = get(this.resort, 'images', [])
      const resultImage = images.find(
        (item: ResortImage) => item.order === order
      )
      if (!resultImage) {
        return
      }
      return resultImage.url
    }
  }
})
</script>

<style lang="scss" scoped>
.page--home::v-deep {
  .card-image img {
    width: rem(410px);
  }
}
.press-banner {
  max-width: rem(1920px);
}
</style>
