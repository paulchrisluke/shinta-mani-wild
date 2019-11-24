<template>
  <!-- type: bird left , TODO: remove type bird, not in use -->
  <div
    v-if="type === 'bird-left'"
    :class="className"
    class="base-quote is-bird w-100 mx-auto position-relative"
  >
    <div class="quote--inner text-dark px-5 py-4 d-flex flex-column justify-content-between w-100">
      <div class="quote--line flex-shrink-0 position-relative is-top mb-4"></div>
      <div class="quote--bird position-absolute"></div>
      <div class="quote--text position-relative pl-5 mb-auto">
        <slot />
      </div>
      <div class="quote--line flex-shrink-0 position-relative is-bottom mt-3"></div>
    </div>
  </div>

  <!-- type: grass 1 -->
  <div
    v-else-if="type === 'grass1'"
    :class="className"
    class="base-quote is-grass w-100 mx-auto position-relative"
  >
    <div class="quote--inner text-dark px-5 py-4 d-flex flex-column justify-content-between w-100">
      <div
        class="x-spacings position-absolute"
        :style="{'background': `repeat-x top left url(${transformCloudinaryUrl(grass1.spacing1, 'h_64,c_scale,q_auto:best')}), repeat-x bottom left url(${transformCloudinaryUrl(grass1.spacing3, 'h_64,c_scale,q_auto:best')})`}"
      ></div>
      <div
        class="y-spacings position-absolute"
        :style="{'background': `repeat-y top left url(${transformCloudinaryUrl(grass1.spacing4, 'w_128,c_scale,q_auto:best')}), repeat-y top right url(${transformCloudinaryUrl(grass1.spacing2, 'w_128,c_scale,q_auto:best')})`}"
      ></div>
      <img
        class="corner corner1 position-absolute"
        :src="transformCloudinaryUrl(grass1.corner1, 'w_128,c_scale,q_auto:best')"
        alt
      />
      <img
        class="corner corner2 position-absolute"
        :src="transformCloudinaryUrl(grass1.corner2, 'w_128,c_scale,q_auto:best')"
        alt
      />
      <img
        class="corner corner3 position-absolute"
        :src="transformCloudinaryUrl(grass1.corner3, 'w_128,c_scale,q_auto:best')"
        alt
      />
      <img
        class="corner corner4 position-absolute"
        :src="transformCloudinaryUrl(grass1.corner4, 'w_128,c_scale,q_auto:best')"
        alt
      />
      <div class="quote--text mb-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'base-quote',
  data() {
    return {
      grass1: {
        corner1:
          'https://res.cloudinary.com/whynotearth/image/upload/v1574308913/Shinta%20Mani%20Wild/General/Quote_Box_1_jolydd.png',
        corner2:
          'https://res.cloudinary.com/whynotearth/image/upload/v1574308915/Shinta%20Mani%20Wild/General/Quote_Box_3_ujykfp.png',
        corner3:
          'https://res.cloudinary.com/whynotearth/image/upload/v1574308915/Shinta%20Mani%20Wild/General/Quote_Box_5_qog324.png',
        corner4:
          'https://res.cloudinary.com/whynotearth/image/upload/v1574308917/Shinta%20Mani%20Wild/General/Quote_Box_8_bwbojr.png',
        spacing1:
          'https://res.cloudinary.com/whynotearth/image/upload/v1574308914/Shinta%20Mani%20Wild/General/Quote_Box_2_hslhkl.png',
        spacing2:
          'https://res.cloudinary.com/whynotearth/image/upload/v1574308915/Shinta%20Mani%20Wild/General/Quote_Box_4_j5ph6p.png',
        spacing3:
          'https://res.cloudinary.com/whynotearth/image/upload/v1574308915/Shinta%20Mani%20Wild/General/Quote_Box_6_voommq.png',
        spacing4:
          'https://res.cloudinary.com/whynotearth/image/upload/v1574308916/Shinta%20Mani%20Wild/General/Quote_Box_7_hbraqq.png'
      }
    }
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'grass1',
      validator: function(value: string) {
        const acceptable = ['bird-left', 'grass1']
        return acceptable.indexOf(value) >= 0
      }
    }
  }
})
</script>

<style lang="scss" scoped>
// common styles
.quote--text {
  font-size: rem(24px);
  z-index: 3;
  $quote-text-line-height: 36px;
  &::v-deep {
    p {
      margin-bottom: 0;
      font-style: italic;
      font-weight: 300;
      line-height: rem($quote-text-line-height);
    }
    b {
      $quote-author-margin: 8px;
      font-size: rem(20px);
      font-weight: bold;
      display: block;
      text-align: right;
      margin-top: rem($quote-author-margin);
      line-height: rem($quote-text-line-height - $quote-author-margin);
    }
  }
}

// uncommon styles
.is-bird {
  &.base-quote {
    max-width: 100%;
    border-radius: rem(20px);
    background-color: $brand-5;
    box-shadow: $box-shadow-md, $box-shadow-sm;
  }
  .quote--bird {
    z-index: 2;
    width: rem(80px);
    height: rem(72px);
    background: no-repeat center $brand-5
      url('https://res.cloudinary.com/whynotearth/image/upload/v1574308917/Shinta%20Mani%20Wild/General/quote-birds_jguoxi_xanoah.svg');
    background-size: rem(auto 72px);
    top: rem(16px);
    left: rem(24px);
  }
  .quote--line {
    height: rem(16px);
    z-index: 1;
    &.is-top {
      background: repeat-x
          url('https://res.cloudinary.com/whynotearth/image/upload/v1574308909/Shinta%20Mani%20Wild/General/line-thick_chyib1_kj505f.svg')
          center bottom,
        repeat-x
          url('https://res.cloudinary.com/whynotearth/image/upload/v1574308909/Shinta%20Mani%20Wild/General/line-thin_agqmow_redjvf.svg')
          center top;
    }
    &.is-bottom {
      background: repeat-x
          url('https://res.cloudinary.com/whynotearth/image/upload/v1574308909/Shinta%20Mani%20Wild/General/line-thick_chyib1_kj505f.svg')
          center top,
        repeat-x
          url('https://res.cloudinary.com/whynotearth/image/upload/v1574308909/Shinta%20Mani%20Wild/General/line-thin_agqmow_redjvf.svg')
          center bottom;
    }
  }
}
.is-grass {
  &.base-quote {
    max-width: 100%;
  }
  .quote--text {
    padding: rem(40px 24px);
    .quote {
      background-color: $brand-5;
    }
  }
  .x-spacings {
    top: 0;
    bottom: 0;
    right: rem(20px);
    left: rem(20px);
  }
  .y-spacings {
    top: rem(20px);
    bottom: rem(20px);
    right: 0;
    left: 0;
  }
  .corner {
    z-index: 2;
  }
  .corner1 {
    left: 0;
    top: 0;
  }
  .corner2 {
    right: 0;
    top: 0;
  }
  .corner3 {
    right: 0;
    bottom: 0;
  }
  .corner4 {
    left: 0;
    bottom: 0;
  }
}
</style>