<template>
  <a
    :class="className"
    class="image-link d-inline-flex justify-content-center align-items-center button-frame font-serif text-uppercase"
    :aria-label="text"
    v-text="text"
  ></a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    text: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.image-link {
  box-shadow: none;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: rem(32px);
  &.is-secondary {
    background-image: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_72/Shinta%20Mani%20Wild/general/Book_Now_Button_Light_jy1vtg.png');
    color: $dark;
    &:hover {
      text-decoration: none;
      color: $dark;
    }
  }
  &.is-primary {
    background-image: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_72/Shinta%20Mani%20Wild/general/Book_Now_Button_Dark_nh7zuz.png');
    color: $white;
    &:hover {
      text-decoration: none;
      color: $white;
    }
  }
  &.is-md {
    $button-width: 173px;
    $button-height: 72px;
    width: rem($button-width);
    height: rem($button-height);
    background-size: rem($button-width $button-height);
  }
}
</style>
