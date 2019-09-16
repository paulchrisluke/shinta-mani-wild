<template>
  <a
    :class="className"
    class="image-link d-inline-flex justify-content-center align-items-center button-frame font-serif text-uppercase position-relative"
    :aria-label="text"
  >
    <div class="image-link--images-wrapper d-flex position-absolute">
      <div class="image-link--left h-100"></div>
      <div class="image-link--center h-100 flex-grow-1"></div>
      <div class="image-link--right h-100"></div>
    </div>
    <span class="image-link--text" v-text="text"></span>
  </a>
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
  .image-link--left {
    width: rem(59px);
  }
  .image-link--right {
    width: rem(50px);
  }
  &.is-secondary {
    // background-image: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_72/Shinta%20Mani%20Wild/general/Book_Now_Button_Light_jy1vtg.png');
    .image-link--left {
      background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_72/Shinta%20Mani%20Wild/general/Button_Broken_Left_nyexsi.png')
        no-repeat center;
    }
    .image-link--center {
      background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_72/Shinta%20Mani%20Wild/general/Button_Broken_Mid_cu34ha.png')
        repeat-x center;
    }
    .image-link--right {
      background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_72/Shinta%20Mani%20Wild/general/Button_Broken_Right_hyntrd.png')
        no-repeat center;
    }
    color: $dark;
    &:hover {
      text-decoration: none;
      color: $dark;
    }
  }
  &.is-primary {
    .image-link--left {
      background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_72/Shinta%20Mani%20Wild/general/Button_Broken_Left_nyexsi.png')
        no-repeat center;
    }
    .image-link--center {
      background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_72/Shinta%20Mani%20Wild/general/Button_Broken_Mid_cu34ha.png')
        repeat-x center;
    }
    .image-link--right {
      background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_72/Shinta%20Mani%20Wild/general/Button_Broken_Right_hyntrd.png')
        no-repeat center;
    }
    color: $white;
    &:hover {
      text-decoration: none;
      color: $white;
    }
  }
  &.is-md {
    $button-height: 72px;
    padding: 0 rem(24px);
    height: rem($button-height);
  }
}
.image-link--text {
  z-index: 1;
}
.image-link--images-wrapper {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
