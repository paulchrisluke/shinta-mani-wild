<template>
  <section class="wrapper">
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
        <article class="item mb-3">
          <div class="content mb-3">
            <div class="position-relative">
              <a class="like position-absolute">
                <img class="like-image d-block" src="https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568559589/Shinta%20Mani%20Wild/general/icon-like_bqhyu6.svg" alt />
              </a>
              <img class="w-100" :src="item.image" :alt="item.title" />
              <h3
                class="title h3 font-weight-normal font-serif my-3 d-flex align-items-center"
                :title="item.ctaText"
              >
                <a
                  class="title-link text-dark stretched-link text-decoration-none"
                  :href="item.ctaLink"
                  v-text="item.ctaText"
                ></a>
              </h3>
            </div>
            <p class="description mb-0" v-read-more="{lineHeight: 18, lines: previewLinesOfReadMore, linkClass: 'd-block float-right'}" v-text="item.content"></p>
          </div>
        </article>
      </div>
    </div>
    <p v-else class="mb-3 text-center">
      <small>There are no items to show</small>
    </p>
  </section>
</template>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'base-articles-list',
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
      type: Number,
      default: 3
    }
  }
})
</script>

<style lang='scss' scoped>
.title {
  line-height: rem(20px);
  height: rem(40px);
}
.title-link {
  @include line-clamp(2);
}
.description {
  font-size: rem(12px);
  line-height: $line-height-base;
}
.like {
  top: rem(8px);
  right: rem(8px);
  z-index: 2;
}
.like-image {
  width: rem(32px);
  height: rem(32px);
}
::v-deep {
  .vue-content-placeholders-text {
    height: rem(54px);
  }
  .read-more-link {
    font-size: rem(12px);
  }
}
</style>
