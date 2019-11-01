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
      const orderFilter = Number(this.$route.params.orderFilter)
      return get(this.resort, 'images', []).filter(
        (item: GalleryImage) => item.order === orderFilter
      )
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
    ;(this as any).init()
  },
  mounted() {
    this.init()
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
  }
})
</script>
