<template>
    <section class="container is-small">
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
            <a class="position-relative gallery-item d-block" :style="{'background-image': `url(${item.url})`}" :href="item.link">
              <div class="heading position-absolute">
                <h3 class="base-heading text-uppercase font-serif h1 text-light text-center" v-html="item.title">Exterior</h3>
              </div>
            </a>
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
  height: rem(320px);
  background: no-repeat center;
  background-size: cover;
  border-radius: rem(10px);
  box-shadow: $box-shadow-md, $box-shadow-sm;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($black, 0.4);
    border-radius: rem(10px);
  }
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