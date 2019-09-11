<template>
  <section class="wrapper">
    <div class="container is-small">
      <template v-if="showPlaceholder">
        <div class="row">
          <content-placeholders
            :class="`col-${12 / itemsPerRow}`"
            rounded
            v-for="item in itemsPerRow"
            :key="item"
          >
            <content-placeholders-img />
          </content-placeholders>
        </div>
      </template>
      <template v-else-if="items.length > 0">
        <div class="row">
          <div :class="`col-${12 / itemsPerRow}`" v-for="(item, index) in items" :key="index">
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
      </template>
      <p v-else class="mb-3 text-center">
        <small>There are no items to show</small>
      </p>
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
.vue-content-placeholders-img {
  height: rem(320px);
}
</style>