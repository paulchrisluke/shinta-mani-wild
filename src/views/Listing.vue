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
            :showPlaceholder="!resort.title"
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
          <p v-else class="mb-0" v-text="resort.description"></p>
        </article>
      </div>

      <!-- gallery -->
      <section class="mb-5">
        <base-heading :text="'Gallery'" :type="'h2'" :class-name="'h2 text-dark text-center'"></base-heading>
        <base-gallery-list :items="galleryItems.slice(0,2)" />
      </section>

      <!-- banner action -->
      <div class="mb-5">
        <base-banner-action :image="resort.backgroundImage">
          <h2 class="h1 text-uppercase font-serif text-light">
            <div class="mb-3">
              <div>Full of</div>
              <div class="pb-3 d-table">Adventure</div>
            </div>
          </h2>
        </base-banner-action>
      </div>

      <!-- articles (stories) -->
      <div class="container is-small mb-6">
        <base-heading
          :show-placeholder="!resort.id"
          :type="'h2'"
          :class-name="'h2 text-dark text-center'"
          :text="`Explore our ${resort.title}`"
        ></base-heading>
        <base-articles-list :items="resort.stories"></base-articles-list>
      </div>

      <!-- quote -->
      <section class="container mb-5">
        <base-quote :show-placeholder="!resort.id" :class-name="'is-right'">
          <div class="quote w-100" v-html="resort.h2"></div>
        </base-quote>
      </section>
    </div>

    <base-action-bar :title="'The Bohemian Tent'" :price="1200"></base-action-bar>

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
import BaseActionBar from '@/components/BaseActionBar.vue'
import { GalleryImage } from '@/types.ts'

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
    BaseActionBar
  },
  data() {
    return {
      slug: this.$route.params.id
    }
  },
  computed: {
    resort(): any {
      return this.$store.getters['resort/getResort']
    },
    galleryItems() {
      const images = this.resortImages
      if (images.length === 0) {
        return []
      }

      const items = [
        {
          link: '/comming-soon',
          title: 'Exterior',
          url: ''
        },
        {
          link: '/comming-soon',
          title: 'Interior',
          url: ''
        }
      ]

      // merge images with other-props-array
      return items.map((item, index) => {
        item.url = images[index].url
        return item
      })
    },
    resortImages(): GalleryImage[] {
      return this.$store.getters['resort/getImages']
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$store.dispatch('resort/getItemBySlug', this.slug)
    }
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
