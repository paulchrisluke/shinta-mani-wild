<template>
  <div class="page page--story">
    <loading-progress />

    <div class="page--content d-flex flex-column flex-grow-1">
      <story-slider
        @on-click-back="onClickBack"
        :items="stories"
        :custom="{ratioBoxClass: 'ratio-9-16'}"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import loading from '@/mixins/loading'
import { Resort, Story } from '@/types'
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
      storyIndex: Number(this.$route.params.storyIndex)
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
    stories(): Story[] {
      const pageStoriesWithNoDuplicate = get(
        (this as any).resort,
        'stories',
        []
      ).filter((item: Story) => item.posterUrl)
      const selectedStory = pageStoriesWithNoDuplicate[this.storyIndex]
      return get((this as any).resort, 'stories', []).filter(
        (item: Story) => item.ctaText === selectedStory.ctaText
      )
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
  .story-slider--inner {
    max-width: rem($slider-story-max-width);
  }
  .swiper-container {
    @include media-breakpoint-up(lg) {
      max-height: rem($slider-story-max-height);
    }
  }
  .story--inner {
    @media (min-width: rem(map-get($grid-breakpoints, 'lg'))) {
      max-width: rem($slider-story-item-max-width-lg);
    }
  }
  .story--inner .aspect-ratio-box {
    max-width: calc((100vh - #{rem(72px)}) * (0.5625));
  }
}
</style>
