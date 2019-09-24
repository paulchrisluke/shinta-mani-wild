<template>
  <div class="page page--story">
    <div class="container story-container py-5">
      <story-slider @on-click-back="onClickBack" :items="stories" />
    </div>
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
      slug: this.$route.params.resortSlug
    }
  },
  mounted() {
    if (this.resort.slug !== this.slug) {
      this.$store.dispatch('resort/getItemBySlug', (this as any).slug)
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
    }
  },
  methods: {
    onClickBack() {
      const routeName = this.$route.name
      const paramId = this.$route.fullPath.split('/')[2]
      if (routeName === 'listingStory') {
        this.$router.push({ name: 'listing', params: { id: paramId } })
      } else {
        this.$router.push({ name: 'search', params: { id: paramId } })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.page--story {
  background-color: $brand-4;
  // background-color: $white;
}
.story-container {
  max-width: 1100px;
}
</style>