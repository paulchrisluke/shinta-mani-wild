<template>
  <div class="position-relative">
    <div class="ghost-wrapper px-3 d-xl-none">
      <div v-if="!showPlaceholder" class="ghost-card-image d-table mx-auto px-3">
        <img :src="image.url" :alt="image.text" />
      </div>
    </div>
    <div :class="{'flex-row-reverse': isLeft}" class="wrapper-card row no-gutters mx-3 mx-xl-0">
      <div class="text col-12 col-xl-6 order-2 order-xl-1">
        <div
          :class="{'pl-xl-5 pr-xl-0': !isLeft, 'pr-xl-5 pl-xl-0': isLeft}"
          class="p-3 pt-xl-5 pb-xl-5"
        >
          <slot name="text"></slot>
        </div>
      </div>
      <div class="image col-12 col-xl-6 order-1 order-xl-2 d-flex align-items-center">
        <content-placeholders class="w-100 h-100 p-3" v-if="showPlaceholder" rounded>
          <content-placeholders-img class="h-100" />
        </content-placeholders>
        <div v-else class="px-3 px-xl-0 mx-auto">
          <div
            :class="{'is-right-skew': !isLeft, 'is-left-skew': isLeft}"
            class="card-image-wrapper skew-effect position-relative"
          >
            <div class="card-image position-relative">
              <img :src="image.url" :alt="image.text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'base-card',
  props: {
    image: {
      type: Object,
      default: null
    },
    isLeft: {
      type: Boolean,
      default: false
    },
    showPlaceholder: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
$card-border-top: 24px;
$amount-of-card-image-inside-card-in-responsive: 80px;
$shadow-small: $box-shadow-md, $box-shadow-sm;
.wrapper-card {
  box-shadow: $shadow-small;
  border-radius: rem(15px);
  border-top: rem($card-border-top) solid $primary;
  background: $brand-2;
}
.card-image-wrapper {
  @include media-breakpoint-down(lg) {
    // the height of image inside card (in viewport < lg)
    height: rem($amount-of-card-image-inside-card-in-responsive);
  }
}
// for the space above card in mobile
.ghost-card-image {
  visibility: hidden;
  img {
    max-width: 100%;
    margin-top: rem(
      -$amount-of-card-image-inside-card-in-responsive + -$card-border-top
    );
  }
}

.card-image {
  img {
    max-width: 100%;
    border-radius: rem(10px);

    @include media-breakpoint-down(lg) {
      transform: translateY(-80%);
      box-shadow: $shadow-small;
    }
  }
}
.skew-effect {
  @include media-breakpoint-up(xl) {
    transform: scale(1.15);
    &::before {
      top: 0;
      bottom: 0;
      position: absolute;
      content: '';
      background: rgba($black, 0.2);
      border-radius: rem(10px);
      filter: blur(2px);
      box-shadow: 0 0 4.5rem rgba($black, 0.2);
    }
    .card-image {
      img {
        .is-right-skew & {
          transform: rotate3d(.5,-.866,0,15deg) rotateZ(1deg);
          box-shadow: 27.1px 62.5px 125px -25px rgba(0,10,0,.5), 16.2px 37.5px 75px -37.5px rgba(0,0,0,.6);
        }
        .is-left-skew & {
          transform: rotate3d(.5,.866,0,15deg) rotateZ(-1deg);
          box-shadow: -27.1px 62.5px 125px -25px rgba(0,10,0,.5), -16.2px 37.5px 75px -37.5px rgba(0,0,0,.6);
        }
      }
    }
    &.is-right-skew {
      left: rem(96px);
      perspective: 1500px;
      &::before {
        right: rem(4px);
        left: 0;
        transform: rotate3d(.5,-.866,0,15deg) rotateZ(1deg);
          box-shadow: 27.1px 62.5px 125px -25px rgba(0,10,0,.5), 16.2px 37.5px 75px -37.5px rgba(0,0,0,.6);
      }
      .card-image {
        // NOTE: set a width for this element where ever you use this component
        img {
          transform: rotate3d(.5,-.866,0,15deg) rotateZ(1deg);
        }
      }
    }
    &.is-left-skew {
      right: rem(96px);
      perspective: 1500px;
      &::before {
        left: rem(4px);
        right: 0;
        transform: rotate3d(.5,.866,0,15deg) rotateZ(-1deg);
          box-shadow: -27.1px 62.5px 125px -25px rgba(0,10,0,.5), -16.2px 37.5px 75px -37.5px rgba(0,0,0,.6);
      }
      .card-image {
        img {
          transform: rotate3d(.5,.866,0,15deg) rotateZ(-1deg);
        }
      }
    }
  }
}
</style>