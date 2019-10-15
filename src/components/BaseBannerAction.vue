<template>
  <section
    class="banner-action position-relative"
    :class="{'has-image': image, 'has-video': video}"
    :style="getWrapperStyle()"
  >
    <div class="position-absolute video-wrapper" v-if="video">
      <video class="video mx-auto d-block" autoplay muted loop>
        <source :src="video" type="video/mp4" />
      </video>
    </div>
    <div class="container is-small h-100 image-wrapper position-relative">
      <div class="h-100 d-flex align-items-center">
        <div class="px-5 w-100">
          <content-placeholders v-if="showPlaceholder" rounded>
            <content-placeholders-heading class="placeholder-heading mb-3" />
          </content-placeholders>
          <template v-else>
            <h2 class="banner-action--text h1 text-uppercase font-serif text-light mb-4">
              <span v-text="text"></span>
            </h2>
          </template>
          <base-image-link :theme="'secondary'" :size="'md'" :text="buttonText" :href="link"></base-image-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseImageLink from '@/components/BaseImageLink.vue'
import BaseHeading from '@/components/BaseHeading.vue'
export default Vue.extend({
  name: 'base-banner-action',
  components: {
    BaseImageLink,
    BaseHeading
  },
  props: {
    image: {
      type: String
    },
    video: {
      type: String
    },
    link: {
      type: String
    },
    text: {
      type: String
    },
    showPlaceholder: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      required: true
    }
  },
  methods: {
    getWrapperStyle() {
      if (!this.image) {
        return
      }
      return {
        'background-image': `url(${this.image})`
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.banner-action {
  height: rem(400px);
  background: $black no-repeat center;
  background-size: cover;
  box-shadow: $box-shadow-md, $box-shadow-sm;
}
.video-wrapper {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
@include media-breakpoint-up(md) {
  .banner-action--text {
    line-height: 1.5;
  }
}
.has-image:not(.has-video) {
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(270deg, transparent 33.33%, $black 100%);
    content: '';
  }
}
.image-wrapper {
  z-index: 1;
}
.placeholder-heading {
  min-height: rem(72px);
  width: rem(300px);
  max-width: 100%;
}
</style>