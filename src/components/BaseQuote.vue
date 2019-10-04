<template>
  <div :class="className" class="base-quote mx-auto position-relative">
    <div class="quote--wrapper text-dark p-4">
      <div class="quote--line is-top mb-5"></div>
      <div class="quote--bird position-absolute"></div>
      <div class="quote--text px-5">
        <content-placeholders v-if="showPlaceholder" centered rounded>
          <content-placeholders-text :lines="4" />
        </content-placeholders>
        <slot v-else />
      </div>
      <div class="quote--line is-bottom mt-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'base-quote',
  props: {
    showPlaceholder: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      required: true,
      validator: function(value: string) {
        // The value must match one of these strings
        return ['is-left', 'is-right'].indexOf(value) !== -1
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.base-quote {
  width: rem(768px);
  max-width: 100%;
  border-radius: rem(20px);
  &.is-left {
    background-color: $brand-5;
  }
}
.quote--bird {
  width: rem(80px);
  height: rem(72px);
  background: no-repeat center $brand-5
    url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570202922/Shinta%20Mani%20Wild/general/quote-birds_jguoxi.svg');
  background-size: rem(auto 72px);
  top: rem(16px);
  left: rem(24px);
}
.quote--line {
  height: rem(16px);
  &.is-top {
    background: repeat-x
        url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570216746/Shinta%20Mani%20Wild/general/line-thick_chyib1.svg')
        center bottom,
      repeat-x
        url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570217027/Shinta%20Mani%20Wild/general/line-thin_agqmow.svg')
        center top;
  }
  &.is-bottom {
    background: repeat-x
        url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570216746/Shinta%20Mani%20Wild/general/line-thick_chyib1.svg')
        center top,
      repeat-x
        url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570217027/Shinta%20Mani%20Wild/general/line-thin_agqmow.svg')
        center bottom;
  }
}
.quote--text {
  font-size: rem(24px);
  &::v-deep {
    p {
      margin-bottom: 0;
      font-style: italic;
      font-weight: 300;
    }
    b {
      font-size: rem(20px);
      font-weight: bold;
      display: block;
      margin-top: rem(16px);
      text-align: right;
    }
  }
}
</style>