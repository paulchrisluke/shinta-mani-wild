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
      return this.$store.getters['resort/getItemBySlug'](this.$route.params.resortId)
    },
    stories(): Story[] {
      const pageStoriesWithNoDuplicate = get(
        (this as any).resort,
        'stories',
        []
      ).filter((item: Story) => item.posterUrl)
      const selectedStory =
        pageStoriesWithNoDuplicate[Number(this.$route.params.storyIndex)]
      return get((this as any).resort, 'stories', []).filter(
        (item: Story) => item.ctaText === selectedStory.ctaText
      )
    }
  },
  methods: {
    init() {
      if (this.resort && this.resort.slug !== this.$route.params.resortId) {
        this.$store.dispatch(
          'resort/getItemBySlug',
          this.$route.params.resortId
        )
      }
    },
    onClickBack() {
      const returnTo: string = (this.$route.query.returnTo as string) || 'home'
      this.$router.push({
        name: returnTo,
        params: { id: this.$route.params.resortId }
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.init()
  },
  mounted() {
    this.init()
  }
})
</script>

<style lang="scss" scoped>
.page--story {
  background-color: $brand-4;
}
</style>
