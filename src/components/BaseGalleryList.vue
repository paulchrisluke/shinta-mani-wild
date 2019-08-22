<template>
  <section class="wrapper">
    <div class="container is-small">
      <div class="row">
        <div class="col-6" v-for="(image, index) in images.slice(0, 2)" :key="index">
          <a class="position-relative gallery-item">
            <img class="gallery-item-image w-100" :src="image.url" alt />
            <div class="heading position-absolute">
              <!-- TODO: use a simple heading element instead base-heading -->
              <base-heading
                v-html="coverTexts[index]"
                :type="'h3'"
                :class-name="'h1 text-light text-center'"
              ></base-heading>
            </div>
          </a>
        </div>
      </div>
    </div>
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
    images: {
      type: Array,
      default: () => []
    },
    coverTexts: {
      type: Array,
      default: () => ['', '']
    },
  }
})
</script>

<style lang="scss" scoped>
.gallery-item {
  cursor: pointer;
}
.gallery-item-image {
  border-radius: rem(10px);
  box-shadow: $box-shadow-md, $box-shadow-sm;
}
.heading {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>