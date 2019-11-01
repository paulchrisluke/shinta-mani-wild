<template>
  <!-- You can't use this component directly -->
  <div
    v-ripple
    class="image-link font-serif text-uppercase d-flex w-100"
    :class="[`is-${theme} is-${size}`]"
  >
    <div
      :style="{'background-image': `url(${transformCloudinaryUrl(image[theme].left, `q_auto:best,h_${buttonHeight}`)})`}"
      class="image-link--left h-100"
    ></div>
    <div
      class="image-link--center h-100 d-flex flex-grow-1 align-items-center justify-content-center"
      :style="{'background-image': `url(${transformCloudinaryUrl(image[theme].center, `q_auto:best,h_${buttonHeight}`)})`}"
    >
      <span class="image-link--text text-nowrap">
        <slot />
      </span>
    </div>
    <div
      class="image-link--right h-100"
      :style="{'background-image': `url(${transformCloudinaryUrl(image[theme].right, `q_auto:best,h_${buttonHeight}`)})`}"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const buttonHeightLg = 128
const buttonHeightMd = 80
const buttonHeightSm = 64
const buttonHeightXs = 40

export default Vue.extend({
  data() {
    return {
      image: {
        secondary: {
          left:
            'https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568620324/Shinta%20Mani%20Wild/general/Button_Light_Broken_Left_qcd0wr.png',
          center:
            'https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568620324/Shinta%20Mani%20Wild/general/Button_Light_Broken_Mid_qmcoim.png',
          right:
            'https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568620566/Shinta%20Mani%20Wild/general/Button_Light_Broken_Right_tbppzc.png'
        },
        primary: {
          left:
            'https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568616916/Shinta%20Mani%20Wild/general/Button_Broken_Left_nyexsi.png',
          center:
            'https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568616404/Shinta%20Mani%20Wild/general/Button_Broken_Mid_cu34ha.png',
          right:
            'https://res.cloudinary.com/ddwsbpkzk/image/upload/v1568616916/Shinta%20Mani%20Wild/general/Button_Broken_Right_hyntrd.png'
        }
      }
    }
  },
  computed: {
    buttonHeight() {
      switch (this.size) {
        case 'lg':
          return buttonHeightLg
          break
        case 'md':
          return buttonHeightMd
          break
        case 'sm':
          return buttonHeightSm
          break
        case 'xs':
          return buttonHeightXs
          break
      }
    }
  },
  props: {
    size: {
      type: String,
      default: 'md'
    },
    theme: {
      type: String,
      default: 'secondary'
    }
  }
})
</script>

<style lang="scss" scoped>
$button-height-lg: 128px;
$button-height-md: 80px;
$button-height-sm: 64px;
$button-height-xs: 40px;
$button-font-size-lg: 40px;
$button-font-size-md: 32px;
$button-font-size-sm: 20px;
$button-font-size-xs: 16px;

.image-link {
  box-shadow: none;
  outline: none;
  border: none;
  background-color: transparent;
  user-select: none;
  color: $white;
  ::v-deep {
    .v-ripple__container {
      color: $white;
      z-index: 1;
    }
  }
  .image-link--left,
  .image-link--right {
    background: no-repeat center;
  }
  .image-link--center {
    background: repeat-x center;
  }
  &.is-secondary {
    color: $dark;
    &:hover {
      text-decoration: none;
      color: $dark;
    }
  }
  &.is-primary {
    color: $white;
    &:hover {
      text-decoration: none;
      color: $white;
    }
  }
  .image-link--text {
    z-index: 1;
  }
  &.is-lg {
    height: rem($button-height-lg);
    font-size: rem($button-font-size-lg);
    &::v-deep {
      .v-ripple__container {
        width: calc(100% - #{rem(20px)});
        height: calc(100% - #{rem(22px)});
        top: rem(11px);
        left: rem(4px);
      }
    }
    .image-link--left {
      width: rem(102px);
    }
    .image-link--right {
      width: rem(90px);
    }
    .image-link--text {
      margin-left: rem(-64px);
      margin-right: rem(-40px);
    }
  }
  &.is-md {
    height: rem($button-height-md);
    font-size: rem($button-font-size-md);
    &::v-deep {
      .v-ripple__container {
        width: calc(100% - #{rem(7px)});
        height: calc(100% - #{rem(12px)});
        top: rem(6px);
        left: 0;
      }
    }
    .image-link--left {
      width: rem(58px);
    }
    .image-link--right {
      width: rem(50px);
    }
    .image-link--text {
      margin-left: rem(-28px);
      margin-right: rem(-20px);
    }
  }
  &.is-sm {
    height: rem($button-height-sm);
    font-size: rem($button-font-size-sm);
    &::v-deep {
      .v-ripple__container {
        width: calc(100% - #{rem(9px)});
        height: calc(100% - #{rem(11px)});
        top: rem(6px);
        left: rem(1px);
      }
    }
    .image-link--left {
      width: rem(51px);
    }
    .image-link--right {
      width: rem(45px);
    }
    .image-link--text {
      margin-left: rem(-28px);
      margin-right: rem(-20px);
    }
  }
  &.is-xs {
    height: rem($button-height-xs);
    font-size: rem($button-font-size-xs);
    &::v-deep {
      .v-ripple__container {
        width: calc(100% - #{rem(7px)});
        height: calc(100% - #{rem(7px)});
        top: rem(3px);
        left: rem(1px);
      }
    }
    .image-link--left {
      width: rem(32px);
    }
    .image-link--right {
      width: rem(28px);
    }
    .image-link--text {
      margin-left: rem(-16px);
      margin-right: rem(-12px);
    }
  }
}
</style>
