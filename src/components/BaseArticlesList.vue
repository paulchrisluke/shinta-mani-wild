<template>
  <section class="wrapper">
    <div class="row">

      <template v-if="!(items.length > 0)">
        <content-placeholders :class="`col-${12 / itemsPerRow}`" rounded v-for="item in itemsPerRow" :key="item">
          <content-placeholders-img />
          <content-placeholders-heading class="my-3"/>
          <content-placeholders-text :lines="2" />
        </content-placeholders>
      </template>
      <div v-else :class="`col-${12 / itemsPerRow}`" v-for="(item, index) in items" :key="index">
        <article class="item mb-3">
          <div class="content position-relative">
            <a class="like position-absolute">
              <img class="like-image d-block" src="~@/assets/img/icon-like.svg" alt />
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
            <p class="description" v-text="item.content"></p>
          </div>
        </article>
      </div>
    </div>
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
  height: rem(3 * $line-height-base * 12px);
  @include line-clamp(3);
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
</style>
