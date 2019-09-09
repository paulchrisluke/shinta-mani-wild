<template>
  <section class="hero-image">
    <div v-if="!image">
      <content-placeholders class="placeholder-image" centered rounded>
        <content-placeholders-img />
      </content-placeholders>
    </div>
    <div class="image-wrapper h-100" v-else>
      <div class="image h-100" :style="{'background-image': `url(${image})`}"></div>
    </div>
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
.image-wrapper {
  box-shadow: $box-shadow-md, $box-shadow-sm;
}
.image {
  background: no-repeat center;
  background-size: cover;
}
</style>