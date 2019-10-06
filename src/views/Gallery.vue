<template>
  <div class="page page--gallery">
    <story-slider
      @on-click-back="onClickBack"
      :items="images"
      :custom="{ratioBoxClass: 'ratio-16-9'}"
    />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Resort, GalleryImage } from '@/types'
import { get } from 'lodash-es'
const StorySlider = () => import('@/components/StorySlider.vue')

export default Vue.extend({
  name: 'story-page',
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
  computed: {
    resort(): Resort {
      return this.$store.getters['resort/getItem']
    },
    images(): GalleryImage[] {
      const result = get(this.resort, 'images', []).filter(
        (item: GalleryImage) => item.order === this.orderFilter
      )
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
  .swiper-container {
    @include media-breakpoint-up(lg) {
      height: calc(100vh - #{190px});
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
      max-width: rem(618px);
    }
    .swiper-pagination-bullet-active {
      &::before {
        transform: translateX(0) !important;
      }
    }
  }
}
</style>