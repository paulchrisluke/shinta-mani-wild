<template>
  <section v-if="image" class="hero-image">
    <div class="image h-100" :style="{'background-image': `url(${image})`}"></div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'hero-image',
  props: {
    image: {
      type: String,
      default: null
    }
  }
})
</script>

<style lang="scss" scoped>
.hero-image {
  box-shadow: $box-shadow-md, $box-shadow-sm;
}
.image {
  background: no-repeat;
  background-size: cover;
}
</style>