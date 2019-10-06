<template>
  <section class="wrapper px-3 px-md-5 py-1">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div class="logo mr-3 d-none d-md-block">
          <img class="w-100 h-100 d-block" src="https://res.cloudinary.com/ddwsbpkzk/image/upload/w_48/Shinta%20Mani%20Wild/general/logo-dark_i1vspg.png" alt />
        </div>
        <h2 class="action-bar--title font-serif text-uppercase mb-0" v-text="title"></h2>
      </div>
      <div class="d-flex align-items-center">
        <!-- <span class="pricing font-sans-serif font-weight-normal mr-5">
          <span class="currency">$</span>
          <span class="price" v-text="price"></span>
          <sub class="postfix text-uppercase">/Night</sub>
        </span> -->
        <slot name="action-button" />
      </div>
    </div>
  </section>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: String,
    price: Number
  }
})
</script>

<style lang='scss' scoped>
.wrapper {
  background-color: $secondary;
  box-shadow: $box-shadow-sm;
}
.action-bar--title {
  font-size: rem(24px);
  @include media-breakpoint-up(md) {
    font-size: rem(40px);
  }
}
.logo {
  width: rem(48px);
  height: rem(48px);
}
.pricing {
  font-size: rem(32px);
}
.postfix {
  font-size: 0.5em;
}
</style>
