<template>
  <div class="page page--story">
    <loading-progress />

    <div class="page--content d-flex flex-grow-1">
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
    max-width: rem(1100px);
  }
  .swiper-container {
    @include media-breakpoint-up(lg) {
      max-height: rem(624px);
    }
  }
  .story--inner {
    max-width: rem(414px);
  }
}
</style>