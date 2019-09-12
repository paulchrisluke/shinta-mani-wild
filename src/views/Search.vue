<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild?node-id=553%3A4724 -->
  <div class="page page--search">
    <div class="page--content">
      <!-- header -->
      <page-header></page-header>

      <div class="mb-5">
        <hero-image :image="resort.featuredImage"></hero-image>
      </div>

      <div class="container is-small mb-5">
        <article>
          <base-heading
            :show-placeholder="!resort.title"
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

      <!-- featured stories -->
      <section class="container is-small mb-5 featured-stories">
        <base-articles-list :show-placeholder="!resort.id" :items-per-row="2" :items="stories.slice(0,2)"></base-articles-list>
      </section>

      <!-- banner action -->
      <div class="mb-5">
        <base-banner-action :image="resort.backgroundImage" :show-placeholder="!resort.id" :link="resort.ctaLink" :text="resort.ctaText"></base-banner-action>
      </div>

      <!-- quote -->
      <section class="container shift-down">
        <base-quote :show-placeholder="!resort.id" :class-name="'is-left'">
          <div class="quote w-100 h-100" v-html="resort.h2"></div>
        </base-quote>
      </section>

      <!-- articles (stories) -->
      <div class="container is-small mb-6">
        <base-articles-list :show-placeholder="!resort.id" :items="stories.slice(2)"></base-articles-list>
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
import { Story, Resort } from '@/types'
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
      slug: this.$route.params.id
    }
  },
  computed: {
    resort(): Resort {
      return this.$store.getters['resort/getResort']
    },
    stories(): Story[] {
      return get(this.resort, 'stories', [])
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
.featured-stories::v-deep {
  .vue-content-placeholders-img {
    height: rem(240px);
  }
}
</style>
