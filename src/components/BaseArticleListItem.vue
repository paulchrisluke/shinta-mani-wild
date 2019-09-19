<template>
  <article class="article-list-item">
    <div class="pb-3">
      <div @mouseover="onMouseOver" @mouseleave="onMouseLeave" class="position-relative">
        <!-- like -->
        <a class="like position-absolute">
          <img
            class="like-image d-block"
            src="https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568559589/Shinta%20Mani%20Wild/general/icon-like_bqhyu6.svg"
            alt
          />
        </a>

        <div class="article-list-item--media">
          <!-- image -->
          <div
            key="poster"
            class="article-list-item--media-poster aspect-ratio-box"
            :class="imageBoxClass"
          >
            <div class="aspect-ratio-box-inside">
              <img
                v-if="item.posterUrl"
                class="article-list-item--image w-100"
                :src="item.posterUrl"
                :alt="item.ctaText"
              />
              <div v-else class="image-placeholder h-100 w-100"></div>
            </div>
          </div>

          <transition name="fade" mode="in-out">
            <!-- video preview (item.image is mp4) -->
            <div
              v-if="isHovered && item.image"
              key="video"
              class="aspect-ratio-box article-list-item--media-inside position-absolute"
              :class="imageBoxClass"
            >
              <div class="aspect-ratio-box-inside">
                <video class="article-list-item--video d-block w-100" autoplay muted loop>
                  <source :src="item.image" type="video/mp4" />
                </video>
              </div>
            </div>
          </transition>
        </div>

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
  data() {
    return {
      isHovered: false,
      mouseOverTimer: -1
    }
  },
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
  },
  methods: {
    onMouseOver() {
      const delayTime = 700
      this.mouseOverTimer = setTimeout(() => {
        this.isHovered = true
      }, delayTime)
    },
    onMouseLeave() {
      this.isHovered = false
      clearTimeout(this.mouseOverTimer)
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
.article-list-item--video {
  transform: translateY(-25%);
}
.article-list-item--media-poster {
  background-color: rgba($brand-2, 0.4);
}
.image-placeholder {
  background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/w_88/Shinta%20Mani%20Wild/home/Bensley_Collection_Shinta_ManiWild_brandmark_white_k9xfuy.png')
    center no-repeat;
  background-size: rem(88px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.article-list-item--media-inside {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
