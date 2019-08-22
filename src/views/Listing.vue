<template>
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
            :class-name="'h1 text-dark text-center'"
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
import BaseGalleryList from '@/components/BaseGalleryList.vue'
export default Vue.extend({
  name: 'listing',
  components: {
    PageHeader,
    PageFooter,
    HeroImage,
    BaseHeading,
    BaseGalleryList
  },
  data() {
    return {
      slug: this.$route.params.id,
      galleryCoverTexts: ['Exterior', 'Interior']
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
