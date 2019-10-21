<template>
  <div class="page page--gallery">
    <loading-progress />

    <div class="page--content d-flex flex-grow-1 flex-column">
      <story-slider
        @on-click-back="onClickBack"
        :items="images"
        :custom="{ratioBoxClass: 'ratio-16-9'}"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import loading from '@/mixins/loading'
import { Resort, GalleryImage } from '@/types'
import { get } from 'lodash-es'
import { MetaInfo } from 'vue-meta'
const StorySlider = () => import('@/components/StorySlider.vue')

export default Vue.extend({
  name: 'story-page',
  mixins: [loading],
  components: {
    StorySlider
  },
  data() {
    return {
      slug: this.$route.params.resortId,
      orderFilter: Number(this.$route.params.orderFilter),
      resortId: Number(this.$route.params.resortId)
    }
  },
  mounted() {
    if (this.resort && this.resort.slug !== this.slug) {
      this.$store.dispatch('resort/getItemBySlug', (this as any).slug)
    }
  },
  metaInfo(): MetaInfo {
    return {
      title: this.resort.title,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.resort.description
        }
      ]
    }
  },
  computed: {
    resort(): Resort {
      return this.$store.getters['resort/getItem']
    },
    images(): GalleryImage[] {
      const result = get(this.resort, 'images', []).filter(
        (item: GalleryImage) => {console.log(item.order); return item.order === this.orderFilter}
      )
      console.log('this.orderFilter', this.orderFilter);
      
      return result
    }
  },
  methods: {
    onClickBack() {
      const returnTo: string = (this.$route.query.returnTo as string) || 'home'
      const paramId = this.$route.params.resortId
      this.$router.push({ name: returnTo, params: { id: paramId } })
    }
  }
})
</script>

<style lang="scss" scoped>
.page--story {
  background-color: $brand-4;
}
::v-deep {
  .story--nav-tools {
    display: none !important;
  }
  .swiper-container {
    @include media-breakpoint-up(lg) {
      height: calc(100vh - #{190px});
    }
    .aspect-ratio-box {
      overflow: visible;
    }
  }
  @include media-breakpoint-up(lg) {
    .swiper-slide-active {
      transform: scale(2) !important;
      .story--details {
        transform: scale(0.5);
        left: auto !important;
      }
    }
    .story--inner {
      max-width: rem($gallery-slide-max-width);
    }
    .swiper-pagination-bullet-active {
      &::before {
        transform: translateX(0) !important;
      }
    }
  }
  .story--inner {
    @media (min-width: rem(map-get($grid-breakpoints, 'lg'))) and (min-height: rem(600px)) {
      box-shadow: rem(0px 7px 8px) rgba($black, 0.2),
        rem(0px 5px 22px) rgba($black, 0.12),
        rem(0px 12px 17px) rgba($black, 0.14);
    }
  }
}
</style>
