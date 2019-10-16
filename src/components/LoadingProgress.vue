<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="loading-progress d-flex justify-content-center align-items-center"
      aria-label="Loading"
    >
      <div class="loading-progress--object"></div>
    </div>
  </transition>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'loading-progress',
  computed: {
    ...mapState({
      isLoading: (state: any) => state.loading.isLoading
    })
  }
})
</script>

<style lang='scss' scoped>
.loading-progress {
  z-index: $loading-zindex;
  overflow: hidden;
  background: $brand-2;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.loading-progress--object {
  width: rem(192px);
  height: rem(116px);
  background: no-repeat center
    url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570704550/Shinta%20Mani%20Wild/general/zipline_i85a4p.gif');
  background-size: contain;
}
</style>
