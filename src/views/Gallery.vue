<template>
  <div class="page page--gallery">
    <loading-progress />

    <div class="page--content d-flex flex-grow-1 flex-column">
      <gallery-slider
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
const GallerySlider = () => import('@/components/GallerySlider.vue')

export default Vue.extend({
  name: 'story-page',
  mixins: [loading],
  components: {
    GallerySlider
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
      return get(this.resort, 'images', []).filter(
        (item: GalleryImage) => item.order === this.orderFilter
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
