<template>
  <section>
    <template v-if="showPlaceholder">
      <div class="row">
        <content-placeholders
          :class="`col-${12 / itemsPerRow}`"
          rounded
          v-for="item in itemsPerRow"
          :key="item"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="2" />
        </content-placeholders>
      </div>
    </template>
    <div v-else-if="items.length > 0" class="row">
      <div :class="`col-${12 / itemsPerRow}`" v-for="(item, index) in items" :key="index">
        <article-list-item :image-box-class="imageBoxClass" :title-class="titleClass" :preview-lines-of-read-more="previewLinesOfReadMore" :item="item" />
      </div>
    </div>
    <p v-else class="mb-3 text-center">
      <small>There are no items to show</small>
    </p>
  </section>
</template>

<script lang='ts'>
import Vue from 'vue'
import articleListItem from '@/components/BaseArticleListItem.vue'

export default Vue.extend({
  name: 'base-articles-list',
  components: { articleListItem },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    itemsPerRow: {
      type: Number,
      default: 4
    },
    showPlaceholder: {
      type: Boolean,
      default: false
    },
    previewLinesOfReadMore: {
      type: Number
    },
    imageBoxClass: {
      type: String
    },
    titleClass: {
      type: String
    }
  }
})
</script>

<style lang='scss' scoped>
::v-deep {
  .vue-content-placeholders-text {
    height: rem(54px);
  }
  .read-more-link {
    font-size: rem(12px);
  }
}
</style>
