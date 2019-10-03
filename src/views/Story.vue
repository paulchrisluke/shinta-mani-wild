<template>
  <div class="page page--story">
    <story-slider
      @on-click-back="onClickBack"
      :items="stories"
      :initial-story-index="initialStoryIndex"
    />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Resort, Story } from '@/types'
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
      initialStoryIndex: Number(this.$route.params.storyIndex)
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
      const pageStoriesWithNoDuplicate = get((this as any).resort, 'stories', []).filter(
        (item: Story) => item.posterUrl
      )
      const selectedStory = pageStoriesWithNoDuplicate[this.initialStoryIndex]
      return get((this as any).resort, 'stories', []).filter(
        (item: Story) => item.ctaText === selectedStory.ctaText
      )
    }
  },
  methods: {
    onClickBack() {
      const returnTo: string = this.$route.query.returnTo as string || 'home'
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
</style>