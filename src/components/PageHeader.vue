<template>
  <div class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="page-header--inner d-flex justify-content-between align-items-center">
            <div class="logo">
              <a href="/" class="logo-link d-block" title="Home">
                <img
                  class="w-100 h-100 d-block"
                  src="https://res.cloudinary.com/ddwsbpkzk/image/upload/w_48/Shinta%20Mani%20Wild/home/Bensley_Collection_Shinta_ManiWild_brandmark_white_k9xfuy.png"
                  alt="Shinta Mani Wild"
                />
              </a>
            </div>
            <div class="page-header--nav">
              <nav>
                <ul class="nav font-serif user-select-none">
                  <li class="nav-item dropdown mx-1">
                    <a
                      @click.prevent.stop="isDropdownTentsOpen = !isDropdownTentsOpen"
                      class="nav-link dropdown-toggle text-light px-2"
                    >
                      <span>Tents</span>
                    </a>
                    <div class="dropdown-menu d-block" v-if="isDropdownTentsOpen">
                      <a class="dropdown-item" href="/search/tents">All Tents</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="/listing/waterfall-tents">Waterfall Tents</a>
                      <a class="dropdown-item" href="/listing/wild-tents">Wild Tents</a>
                      <a
                        class="dropdown-item"
                        href="/listing/wildlife-alliance-tents"
                      >Wildlife Alliance Tents</a>
                    </div>
                  </li>
                  <li class="nav-item mx-1">
                    <a href="/search/adventure" class="nav-link text-light px-2">Adventures</a>
                  </li>
                  <li class="nav-item mx-1">
                    <a href="/search/food-and-drink" class="nav-link text-light px-2">Food and Drink</a>
                  </li>
                  <li class="nav-item mx-1">
                    <a href="/search/wellness" class="nav-link text-light px-2">Wellness</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  background: $primary;
  height: rem($header-height);
}
.page-header--inner {
  height: rem($header-height);
}
.page-header--nav {
  font-size: rem(20px);
}
.logo-link {
  width: rem(44px);
  height: rem(44px);
}
.font-serif {
  font-size: rem(16px * $serif-font-size-correction);
}
</style>

<script lang="ts">
import Vue from 'vue'
import { getPassiveEventConfig } from '@/helpers'

export default Vue.extend({
  data() {
    return {
      isDropdownTentsOpen: false
    }
  },
  mounted() {
    this.clickOutsideDropdownListener()
  },
  methods: {
    clickOutsideDropdownListener() {
      document.addEventListener(
        'click',
        this.onClickOutsideDropdown,
        getPassiveEventConfig()
      )
    },
    onClickOutsideDropdown() {
      this.isDropdownTentsOpen = false
    }
  },
  destroyed() {
    document.removeEventListener('click', this.onClickOutsideDropdown)
  }
})
</script>