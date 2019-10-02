<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild?node-id=553%3A4724 -->
  <div class="page page--search">
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

      <!-- featured stories -->
      <section class="container is-small mb-5 featured-items">
        <base-articles-list
          :route-props="{ returnTo: 'search', resortId: $route.params.id }"
          :image-box-class="'ratio-16-9'"
          :title-class="'h2 font-weight-light'"
          :preview-lines-of-read-more="2"
          :show-placeholder="!resort.id"
          :items-per-row="2"
          :items="stories.slice(0,featuredStoriesCount)"
          preview-transformations='q_auto:low,e_preview:duration_10,w_440,h_248,c_fill,ar_16:9,ac_none'
          poster-transformations='q_auto:good,w_440,h_248,c_fill,g_auto'
        ></base-articles-list>
      </section>

      <!-- banner action -->
      <div class="mb-5">
        <base-banner-action
          :image="resort.backgroundImage"
          :show-placeholder="!resort.id"
          :link="resort.ctaLink"
          :text="resort.ctaText"
          :button-text="'Book Now'"
        ></base-banner-action>
      </div>

      <!-- quote -->
      <section class="container shift-xl-down mb-5 mb-xl-0">
        <base-quote :show-placeholder="!resort.id" :class-name="'is-left'">
          <div class="quote w-100 h-100" v-html="resort.h2"></div>
        </base-quote>
      </section>

      <!-- articles (stories) -->
      <div class="container is-small mb-6">
        <!-- NOTE: slice items from `items-offset` to end (because some of items are in use in featured section) -->
        <base-articles-list
          :route-props="{ returnTo: 'search', resortId: $route.params.id }"
          :show-placeholder="!resort.id"
          :items-offset="featuredStoriesCount"
          :items="stories"
          preview-transformations='q_auto:low,e_preview:duration_8,w_212,c_fill,ar_1:1,ac_none'
          poster-transformations='q_auto:best,w_212,h_212,c_fill,g_auto'
        ></base-articles-list>
      </div>
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
      featuredStoriesCount: 2,
      slug: this.$route.params.id
    }
  },
  computed: {
    resort(): Resort {
      return this.$store.getters['resort/getItem']
    },
    stories(): Story[] {
      return get(this.resort, 'stories', []).filter(
        (item: Story) => item.posterUrl
      )
    }
  },
  mounted() {
    this.$store.dispatch('resort/getItemBySlug', this.slug)
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
  min-height: rem(356px);
  &::v-deep {
    .vue-content-placeholders-img {
      height: rem(162px);
    }
  }
}
</style>
