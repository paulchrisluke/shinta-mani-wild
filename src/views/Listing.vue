<template>
  <div class="page page--listing">
    <div class="page--content">
      <!-- header -->
      <page-header></page-header>

      <div class="mb-5">
        <hero-image :image="resort.featuredImage"></hero-image>
      </div>

      <div class="mb-5">
        <base-heading :text="resort.title" :type="'h1'" :class-name="'h1 text-dark text-center'" :border-art="true">
          
        </base-heading>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import HeroImage from '@/components/HeroImage.vue'
import BaseHeading from '@/components/BaseHeading.vue'
export default Vue.extend({
  name: 'listing',
  components: {
    PageHeader,
    HeroImage,
    BaseHeading
  },
  data() {
    return {
      slug: this.$route.params.id
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
