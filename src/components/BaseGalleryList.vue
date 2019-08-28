<template>
  <section class="wrapper">
    <div class="container is-small">
      <div class="row">
        <div class="col-6" v-for="(item, index) in items.slice(0, 2)" :key="index">
          <a class="position-relative gallery-item" :href="item.link">
            <img class="gallery-item-image w-100" :src="item.url" alt />
            <div class="heading position-absolute">
              <!-- TODO: use a simple heading element instead base-heading -->
              <base-heading
                v-html="item.title"
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
    items: {
      type: Array,
      default: () => []
    }
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