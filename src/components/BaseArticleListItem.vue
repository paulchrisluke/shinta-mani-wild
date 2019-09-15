<template>
  <article class="article-list-item">
    <div class="pb-3">
      <div class="position-relative">
        <a class="like position-absolute">
          <img
            class="like-image d-block"
            src="https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568559589/Shinta%20Mani%20Wild/general/icon-like_bqhyu6.svg"
            alt
          />
        </a>
        <div class="aspect-ratio-box" :class="imageBoxClass">
          <div class="aspect-ratio-box-inside">
            <img v-if="item.posterUrl" class="article-list-item--image w-100" :src="item.posterUrl" :alt="item.ctaText" />
            <div v-else class="image-placeholder h-100 w-100"></div>
          </div>
        </div>
        <!-- <video class="video d-block" autoplay muted loop>
                <source :src="item.image" type="video/mp4" />
        </video>-->
        <h3
          class="title h3 font-weight-normal font-serif my-2 d-flex align-items-center"
          :title="item.ctaText"
        >
          <a
            class="title-link text-dark stretched-link text-decoration-none"
            :href="item.ctaLink"
            v-text="item.ctaText"
          ></a>
        </h3>
      </div>
      <p
        class="description mb-0"
        v-read-more="{lineHeight: 18, lines: previewLinesOfReadMore, linkClass: 'd-block float-right mb-3'}"
        v-text="item.content"
      ></p>
    </div>
  </article>
</template>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  props: {
    item: {
      type: Object,
      required: true
    },
    previewLinesOfReadMore: {
      type: Number,
      default: 3
    },
    imageBoxClass: {
      type: String,
      default: 'ratio-1-1'
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
.image-placeholder {
  background: url("https://res.cloudinary.com/ddwsbpkzk/image/upload/w_88/Shinta%20Mani%20Wild/home/Bensley_Collection_Shinta_ManiWild_brandmark_white_k9xfuy.png") center rgba($brand-2, 0.4) no-repeat;
  background-size: rem(88px);
}
</style>
