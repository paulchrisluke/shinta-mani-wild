<template>
  <div class="page-header">
    <div class="container h-100">
      <div class="row h-100">
        <div class="col-12">
          <div class="page-header--inner d-md-flex d-none justify-content-between align-items-center">
            <div class="logo">
              <a href="/" class="logo-link d-block" title="Home">
                <img
                  class="w-100 h-100 d-block"
                  src="https://res.cloudinary.com/ddwsbpkzk/image/upload/w_48/Shinta%20Mani%20Wild/home/Bensley_Collection_Shinta_ManiWild_brandmark_white_k9xfuy.png"
                  alt="Shinta Mani Wild"
                />
              </a>
            </div>
            <div class="page-header--nav d-flex align-items-center">
              <nav> 
                <ul class="nav user-select-none text-small-caps font-weight-light">
                  <li class="nav-item dropdown mx-1" :class="{'show': isDropdownTentsOpen}">
                    <a
                      href="#"
                      @click.prevent.stop="isDropdownTentsOpen = !isDropdownTentsOpen"
                      class="nav-link dropdown-toggle text-light px-2"
                      id="page-header--dropdown-1"
                    >Tents</a>
                    <div
                      class="dropdown-menu"
                      :class="{'show': isDropdownTentsOpen}"
                      aria-labelledby="page-header--dropdown-1"
                      aria-haspopup="true"
                      :aria-expanded="isDropdownTentsOpen + ''"
                    >
                      <a class="dropdown-item" href="/tents">All Tents</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="/listing/wild-tents">Wild Tents</a>
                      <a class="dropdown-item" href="/listing/waterfall-tents">Waterfall Tents</a>
                      <a
                        class="dropdown-item"
                        href="/listing/two-bedroom-tent"
                      >Two Bedroom Tent</a>
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
              <div
                v-if="isViewTentsVisible"
                class="ml-1">
                <base-image-link
                  :class-name="'is-secondary is-md ml-2'"
                  :href="'/tents'"
                  :text="'View Tents'"
                ></base-image-link>
              </div>
            </div>
          </div>
            <div class="d-inline-flex d-md-none justify-content-between align-items-center h-100 w-100">
              <div class="logo">
                <a href="/" class="logo-link d-block" title="Home">
                  <img
                    class="w-100 h-100 d-block"
                    src="https://res.cloudinary.com/ddwsbpkzk/image/upload/w_48/Shinta%20Mani%20Wild/home/Bensley_Collection_Shinta_ManiWild_brandmark_white_k9xfuy.png"
                    alt="Shinta Mani Wild"
                  />
                </a>
              </div>
              <button
                class="hamburger-icon ml-auto"
                @click.prevent.stop="isMobileMenuTentsOpen = !isMobileMenuTentsOpen"
                >
                <img
                  class="haburger-image d-block"
                  src="https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570355029/Shinta%20Mani%20Wild/general/menu_24px_e3zpqv.svg"
                />
              </button>
              <nav>
                <ul v-if="isMobileMenuTentsOpen"
                  class="nav mobile-menu-open user-select-none text-small-caps font-weight-light">
                  <li class="col-12 nav-item nav-title font-serif mx-1 mt-2">Tents</li>
                  <div class="col-12"><hr class="my-2"></div>
                  <li class="col-12 nav-item">
                     <a 
                      class="nav-link px-0" 
                      href="/listing/wild-tents">Wild Tents</a>
                  </li>
                  <li class="col-12 nav-item">
                     <a 
                      class="nav-link px-0" 
                      href="/listing/waterfall-tents">Waterfall Tents</a>
                  </li>
                  <li class="col-12 nav-item">
                     <a 
                      class="nav-link px-0" 
                      href="/listing/two-bedroom-tent">Two Bedroom Tent</a> 
                  </li>
                  <li class="col-12 nav-item nav-title font-serif mt-3">Things to Do</li>
                  <div class="col-12"><hr class="my-2"></div>
                  <li class="col-12 nav-item">
                    <a 
                      href="/search/adventure" 
                      class="nav-link px-0">Adventures</a>
                  </li>
                  <li class="col-12 nav-item">
                    <a 
                      href="/search/food-and-drink" 
                      class="nav-link px-0">Food and Drink</a>
                  </li>
                  <li class="col-12 nav-item">
                    <a 
                      href="/search/wellness" 
                      class="nav-link px-0">Wellness</a>
                  </li>
                  <li
                    class="col-12 mt-6"
                    v-if="isViewTentsVisible">
                    <base-image-link
                      :class-name="'is-secondary is-md w-100'"
                      :href="'/tents'"
                      :text="'View Tents'"
                    ></base-image-link>
                  </li>
                </ul>
              </nav>
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
  font-size: rem(18px);
}
.logo-link {
  width: rem(44px);
  height: rem(44px);
}
.font-serif {
  font-size: rem(16px * $serif-font-size-correction);
}
.mobile-menu-open {
  position: absolute;
  top: rem($header-height);
  left: 0;
  padding: rem(8px);
  background: $white;
  z-index: 1;
  .nav-title {
    font-size: rem(18px * $serif-font-size-correction);
    color: $primary;
  }
  .nav-link {
    color: $black;
  }
  hr {
    background: $primary;
  }
}
.hamburger-icon {
    background: transparent;
    border: none;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { getPassiveEventConfig } from '@/helpers'
import BaseImageLink from '@/components/BaseImageLink.vue'

export default Vue.extend({
  name: 'page-header',
  components: {
    BaseImageLink
  },
  props: {
    isViewTentsVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isDropdownTentsOpen: false,
      isMobileMenuTentsOpen: false
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

<style lang="scss" scoped>
.dropdown-toggle {
  &::after {
    border: none;
    margin-left: rem(8px);
    background: no-repeat center url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE2IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC4xMzMzIDBMOCA0Ljk3Mjk3TDEuODY2NjcgMEwwIDEuNTEzNTFMOCA4TDE2IDEuNTEzNTFMMTQuMTMzMyAwWiIgZmlsbD0iI0ZGRkZGMCIvPjwvc3ZnPg==);
    width: rem(16px);
    height: rem(16px);
    vertical-align: -0.1rem;
  }
}
.dropdown-menu {
  margin-top: rem(20px);
}
</style>
