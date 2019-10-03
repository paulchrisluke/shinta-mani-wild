<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild?node-id=553%3A4724 -->
  <div class="page page--listing">
    <div class="page--content">
      <!-- header -->
      <page-header></page-header>

      <div>
        <hero-image :image="resort.featuredImage"></hero-image>
      </div>

      <div class="position-relative py-5">
        <div class="container is-small page-description">
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

        <!-- gallery -->
        <section>
          <base-heading :text="'Gallery'" :type="'h2'" :class-name="'h2 text-dark text-center'"></base-heading>
          <base-gallery-list :show-placeholder="!resort.id" :items="galleryItems.slice(0,2)" />
        </section>

        <template v-for="(doodle, index) in pageDoodles.slice(0, 2)">
          <img
            :class="`doodle doodle-item-0-${index} position-absolute`"
            data-aos="fade-down"
            :src="transformCloudinaryUrl(doodle.url, 'q_auto:low,fl_any_format,o_50,h_350,w_350,c_limit')"
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

      <div class="position-relative py-5">
        <!-- quote -->
        <section class="container shift-xl-down">
          <base-quote :show-placeholder="!resort.id" :class-name="'is-left'">
            <div class="quote w-100 h-100" v-html="resort.h2"></div>
          </base-quote>
        </section>

        <!-- articles (stories) -->
        <div class="container is-small">
          <base-heading
            :show-placeholder="!resort.id"
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

        <template v-for="(doodle, index) in pageDoodles.slice(2, 5)">
          <img
            :class="`doodle doodle-item-1-${index} position-absolute`"
            data-aos="fade-down"
            :src="transformCloudinaryUrl(doodle.url, 'q_auto:low,fl_any_format,o_50,h_350,w_350,c_limit')"
            :key="index"
            alt
          />
        </template>
      </div>
    </div>

    <booking-bar :title="resort.title" :price="1200"></booking-bar>

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
import doodles from '@/mixins/doodles'
import 'aos/dist/aos.css'

export default Vue.extend({
  name: 'listing',
  mixins: [doodles],
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
