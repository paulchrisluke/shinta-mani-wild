<template>
  <section class="container is-small">
    <template v-if="items.length > 0">
      <div class="row">
        <div :class="`col-${12 / itemsPerRow}`" v-for="(item, index) in items" :key="index">
          <div class="aspect-ratio-box ratio-11-8">
            <div class="aspect-ratio-box-inside">
              <router-link class="gallery-item d-block" :to="item.link">
                <img
                  class="gallery-item--image w-100"
                  :src="transformCloudinaryUrl(item.url, 'w_440,h_320,c_crop,g_auto')"
                  :alt="item.title"
                />
                <div class="gallery-list--heading position-absolute">
                  <h3
                    class="gallery-list--heading-text text-uppercase font-serif h1 text-light text-center mb-0"
                    v-html="item.title"
                  >Exterior</h3>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </template>
    <p v-else class="mb-3 text-center">
      <small>There are no items to show</small>
    </p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseHeading from '@/components/BaseHeading.vue'
export default Vue.extend({
  name: 'base-gallery-list',
  components: {
    BaseHeading
  },
  props: {
    itemsPerRow: {
      type: Number,
      default: 2
    },
    items: {
      type: Array,
      default: () => []
    },
    showPlaceholder: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.gallery-item {
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($black, 0.4);
    border-radius: rem(10px);
    opacity: 1;
    transition: opacity 300ms ease;
  }
  &:hover::before {
    opacity: 0;
  }
}
.gallery-item--image {
  border-radius: rem(10px);
  box-shadow: $box-shadow-md, $box-shadow-sm;
}
.gallery-list--heading {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.gallery-list--heading-text {
  @include media-breakpoint-down(sm) {
    font-size: $h1-font-size-mobile * 0.7;
  }
}
.vue-content-placeholders-img {
  height: rem(320px);
}
</style>