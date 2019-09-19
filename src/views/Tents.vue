<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild?node-id=553%3A4724 -->
  <div class="page page--tents">
    <div class="page--content">
      <!-- header -->
      <page-header></page-header>

      <div class="mb-5">
        <hero-image :image="resort.featuredImage"></hero-image>
      </div>

      <div class="container is-small mb-5 page-description">
        <article>
          <base-heading
            :show-placeholder="!resort.id"
            :text="resort.title"
            :type="'h1'"
            :class-placeholder="'heading-placeholder mb-5'"
            :class-name="'h1 is-huge text-dark text-center mb-5'"
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
            v-read-more="{lineHeight: 24, lines: 3, linkClass: 'd-block float-right'}"
            v-text="resort.description"
          ></p>
        </article>
      </div>

      <!-- accommodations -->
      <section class="container is-small mb-5 featured-items">
        <base-articles-list
          :image-box-class="'ratio-16-9'"
          :preview-lines-of-read-more="2"
          :show-placeholder="!resort.id"
          :items-per-row="3"
          :items="accommodationsAsStories.slice(0,3)"
        ></base-articles-list>
      </section>

      <!-- banner action -->
      <div class="mb-5">
        <base-banner-action
          :image="resort.backgroundImage"
          :show-placeholder="!resort.id"
          :link="resort.ctaLink"
          :text="resort.ctaText"
          :button-text="bannerActionButtonText"
        ></base-banner-action>
      </div>

      <!-- quote -->
      <section class="container shift-down">
        <base-quote :show-placeholder="!resort.id" :class-name="'is-left'">
          <div class="quote w-100 h-100" v-html="resort.h2"></div>
        </base-quote>
      </section>
    </div>

    <page-footer></page-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import HeroImage from '@/components/HeroImage.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBannerAction from '@/components/BaseBannerAction.vue'
import BaseArticlesList from '@/components/BaseArticlesList.vue'
import BaseQuote from '@/components/BaseQuote.vue'
import { Story, Resort, Category } from '@/types'
import { get } from 'lodash-es'
import { categoryToStoryBridge } from '@/helpers'

export default Vue.extend({
  name: 'listing',
  components: {
    PageHeader,
    PageFooter,
    HeroImage,
    BaseHeading,
    BaseBannerAction,
    BaseArticlesList,
    BaseQuote
  },
  data() {
    return {
      slug: 'tents'
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
    accommodationsAsStories() {
      // @ts-ignore
      return this.accommodations.map(categoryToStoryBridge)
    },
    bannerActionButtonText() {
      return 'Contact Us'
    }
  },
  mounted() {
    this.$store.dispatch('resort/getItemBySlug', this.slug)
    this.$store.dispatch('category/getItemsByName', 'accommodations')
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
.page-description::v-deep {
  .heading-placeholder {
    height: rem(100px);
  }
  .vue-content-placeholders-heading {
    height: 100%;
  }
  .description-placeholder {
    height: rem(72px);
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
.featured-items {
  min-height: rem(288px);
  &::v-deep {
    .vue-content-placeholders-img {
      height: rem(162px);
    }
  }
}
</style>
