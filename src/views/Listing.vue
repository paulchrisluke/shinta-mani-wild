<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild?node-id=553%3A4724 -->
  <div class="page page--listing">
    <div class="page--content">
      <!-- header -->
      <page-header></page-header>

      <div class="mb-5">
        <hero-image :image="resort.featuredImage"></hero-image>
      </div>

      <div class="container is-small mb-5">
        <article>
          <base-heading
            :show-placeholder="!resort.id"
            :text="resort.title"
            :type="'h1'"
            :class-name="'h1 is-huge text-dark text-center mb-5'"
            :border-art="true"
          ></base-heading>

          <div v-if="!resort.description">
            <content-placeholders centered rounded>
              <content-placeholders-text :lines="4" />
            </content-placeholders>
          </div>
          <p v-else class="mb-0" v-read-more="{lineHeight: 24, lines: 3, linkClass: 'd-block float-right'}" v-text="resort.description"></p>
        </article>
      </div>

      <!-- gallery -->
      <section class="mb-5">
        <base-heading :text="'Gallery'" :type="'h2'" :class-name="'h2 text-dark text-center'"></base-heading>
        <base-gallery-list :show-placeholder="!resort.id" :items="galleryItems.slice(0,2)" />
      </section>

      <!-- banner action -->
      <div class="mb-5">
        <base-banner-action :image="resort.backgroundImage" :show-placeholder="!resort.id" :link="resort.ctaLink" :text="resort.ctaText"></base-banner-action>
      </div>

      <!-- quote -->
      <section class="container shift-down">
        <base-quote :show-placeholder="!resort.id" :class-name="'is-right'">
          <div class="quote w-100 h-100" v-html="resort.h2"></div>
        </base-quote>
      </section>

      <!-- articles (stories) -->
      <div class="container is-small mb-6">
        <base-heading
          :show-placeholder="!resort.id"
          :type="'h2'"
          :class-name="'h2 text-dark text-center'"
          :text="`Explore our ${resort.title}`"
        ></base-heading>
        <base-articles-list :show-placeholder="!resort.id" :items="stories"></base-articles-list>
      </div>
    </div>

    <booking-bar :title="'The Bohemian Tent'" :price="1200"></booking-bar>

    <page-footer></page-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import HeroImage from '@/components/HeroImage.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseGalleryList from '@/components/BaseGalleryList.vue'
import BaseBannerAction from '@/components/BaseBannerAction.vue'
import BaseArticlesList from '@/components/BaseArticlesList.vue'
import BaseQuote from '@/components/BaseQuote.vue'
import BookingBar from '@/components/BookingBar.vue'
import { GalleryImage, Story, Resort } from '@/types'
import { get } from 'lodash-es'

export default Vue.extend({
  name: 'listing',
  components: {
    PageHeader,
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
      slug: this.$route.params.id
    }
  },
  computed: {
    resort(): Resort {
      return this.$store.getters['resort/getResort']
    },
    stories(): Story[] {
      return get((this as any).resort, 'stories', [])
    },
    resortImages(): GalleryImage[] {
      return get((this as any).resort, 'images', [])
    },
    galleryItems() {
      const images = (this as any).resortImages
      if (images.length === 0) {
        return []
      }

      const items = [
        {
          link: '/comming-soon',
          title: 'Exterior',
          url: get(images, '[0].url', '')
        },
        {
          link: '/comming-soon',
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

<style lang="scss" scoped>
::v-deep {
  .hero-image {
    height: rem($hero-height);

    @include hero-placeholder($hero-height);
  }
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
