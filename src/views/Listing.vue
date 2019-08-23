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
            :text="resort.title"
            :type="'h1'"
            :class-name="'h1 text-dark text-center mb-5'"
            :border-art="true"
          ></base-heading>

          <p class="mb-0" v-text="resort.description"></p>
        </article>
      </div>

      <!-- gallery -->
      <section class="mb-5">
        <base-heading :text="'Gallery'" :type="'h2'" :class-name="'h2 text-dark text-center'"></base-heading>
        <base-gallery-list :images="resort.images" :cover-texts="galleryCoverTexts" />
      </section>

      <!-- banner action -->
      <div class="mb-5">
        <base-banner-action :image="bannerImage">
          <h2 class="h1 text-uppercase font-serif text-light">
            <div class="mb-3">
              <div>Full of</div>
              <div class="pb-3 d-table">Adventure</div>
            </div>
          </h2>
        </base-banner-action>
      </div>

      <!-- articles -->
      <div class="container is-small mb-6">
        <base-heading
          :type="'h2'"
          :class-name="'h2 text-dark text-center'"
          :text="`Explore our ${resort.title}`"
        ></base-heading>
        <base-articles-list :items="articlesList"></base-articles-list>
      </div>

      <!-- quote -->
      <section class="container mb-5">
        <base-quote :class-name="'is-right'">
          <p
            class="mb-0 font-italic font-weight-light"
          >“I discovered a version of luxury travel I could live with: a rare and extravagant feast of the senses hidden deep within the jungle; an unexpected, delightful conversation named Shinta Mani Wild…”</p>
          <p class="font-weight-bold">Charles Graeber, Travel+Leisure - The IT List 2019</p>
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
      slug: this.$route.params.id,
      galleryCoverTexts: ['Exterior', 'Interior'],
      bannerImage: {
        url: 'http://placehold.it/1440x400/3D5200'
      },
      // TODO: replace by store data and move to computed
      articlesList: [
        {
          title: 'sample article one',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!',
          url: '/link-to-article-one',
          image: 'http://placehold.it/210x210'
        },
        {
          title: 'sample article two longer than normal',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!',
          url: '/link-to-article-one',
          image: 'http://placehold.it/210x210'
        },
        {
          title: 'sample article three even more longer than beforeeee',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!',
          url: '/link-to-article-one',
          image: 'http://placehold.it/210x210'
        },
        {
          title: 'sample article three even more longer than beforeeee',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!consectetur adipisicing elit. Tempore ducimus voluptates aliquam, magnam itaque sapiente error illo omnis numquam autem!',
          url: '/link-to-article-one',
          image: 'http://placehold.it/210x210'
        }
      ]
    }
  },
  computed: {
    resort(): any {
      return this.$store.getters['resort/getResort']
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
::v-deep .hero-image {
  height: rem(736px);
}
</style>
