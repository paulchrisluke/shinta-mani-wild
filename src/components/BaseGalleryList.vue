<template>
  <section class="wrapper">
    <div class="container is-small">
      <div class="row">
        <div class="col-6" v-for="image in images" :key="image.id">
          <a class="position-relative gallery-item">
            <img :src="image.src" :alt="image.title" />
            <div class="heading position-absolute">
              <!-- TODO: use a simple heading element instead base-heading -->
              <base-heading
                v-html="image.title"
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
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.gallery-item {
  cursor: pointer;
}
.heading {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>