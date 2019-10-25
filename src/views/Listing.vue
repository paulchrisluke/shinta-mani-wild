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
          :rest="{autoplay: false, loop: true}"
          :video-transformations="'q_auto:best'"
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
              <div class="quote h-100" v-html="resort.h2"></div>
            </base-quote>
          </section>
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
    BookingBar
  },
  data() {
    return {
      slug: this.$route.params.id,
      featuredStoriesCount: 0
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
