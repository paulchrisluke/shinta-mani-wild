<template>
  <section class="wrapper">
    <div class="row">
      <div class="col-3" v-for="(item, index) in items" :key="index">
        <article class="item mb-3">
          <div class="content position-relative">
            <a class="like position-absolute">
              <img class="like-image d-block" src="~@/assets/img/icon-like.svg" alt />
            </a>
            <img class="w-100" :src="item.image" :alt="item.title" />
            <h3
              class="title h3 font-weight-normal font-serif my-3 d-flex align-items-center"
              :title="item.title"
            >
              <a
                class="title-link text-dark stretched-link text-decoration-none"
                :href="item.url"
                v-text="item.title"
              ></a>
            </h3>
            <p class="description" v-text="item.description"></p>
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
