<template>
  <div class="page-header position-relative">
    <div class="page-header--ghost d-md-none"></div>
    <div class="page-header--content">
      <div class="page-header--content-inner position-relative">
        <div class="container h-100 position-relative">
          <div class="row h-100">
            <div class="col-12">
              <div
                class="page-header--inner d-md-flex d-none justify-content-between align-items-center"
              >
                <div class="logo">
                  <router-link to="/" class="logo-link d-block" title="Home">
                    <img
                      class="w-100 h-100 d-block"
                      src="https://res.cloudinary.com/whynotearth/image/upload/w_48/Shinta%20Mani%20Wild/Home/Bensley_Collection_Shinta_ManiWild_brandmark_white_2_ns8kxh.png"
                      alt="Shinta Mani Wild"
                    />
                  </router-link>
                </div>
                <div class="page-header--nav d-flex align-items-center">
                  <nav>
                    <ul class="nav user-select-none font-serif-2 font-weight-light">
                      <li class="nav-item dropdown mx-1" :class="{'show': isDropdownTentsOpen}">
                        <a
                          href="#"
                          @click.prevent.stop="isDropdownTentsOpen = !isDropdownTentsOpen"
                          v-ripple
                          class="nav-link h-100 py-0 dropdown-toggle text-light px-2"
                          id="page-header--dropdown-1"
                        >Tents</a>
                        <div
                          class="dropdown-menu"
                          :class="{'show': isDropdownTentsOpen}"
                          aria-labelledby="page-header--dropdown-1"
                          aria-haspopup="true"
                          :aria-expanded="isDropdownTentsOpen + ''"
                        >
                          <router-link to="/tents" class="dropdown-item">All Tents</router-link>
                          <div class="dropdown-divider"></div>
                          <router-link class="dropdown-item" to="/listing/wild-tents">Wild Tents</router-link>
                          <router-link
                            class="dropdown-item"
                            to="/listing/waterfall-tents"
                          >Waterfall Tents</router-link>
                          <router-link
                            class="dropdown-item"
                            to="/listing/two-bedroom-tent"
                          >Two Bedroom Tent</router-link>
                        </div>
                      </li>
                      <li class="nav-item mx-1">
                        <router-link
                          v-ripple
                          to="/search/adventure"
                          class="nav-link h-100 py-0 text-light px-2"
                        >Adventures</router-link>
                      </li>
                      <li class="nav-item mx-1">
                        <router-link
                          v-ripple
                          to="/search/food-and-drink"
                          class="nav-link h-100 py-0 text-light px-2"
                        >Food and Drink</router-link>
                      </li>
                      <li class="nav-item mx-1">
                        <router-link
                          v-ripple
                          to="/search/wellness"
                          class="nav-link h-100 py-0 text-light px-2"
                        >Wellness</router-link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div
                class="d-inline-flex d-md-none justify-content-between align-items-center h-100 w-100 px-3"
              >
                <div class="logo">
                  <router-link v-ripple to="/" class="logo-link d-block" title="Home">
                    <img
                      class="w-100 h-100 d-block"
                      src="https://res.cloudinary.com/whynotearth/image/upload/w_48/Shinta%20Mani%20Wild/Home/Bensley_Collection_Shinta_ManiWild_brandmark_white_2_ns8kxh.png"
                      alt="Shinta Mani Wild"
                    />
                  </router-link>
                </div>
                <button
                  class="hamburger-button pb-2 ml-auto px-0"
                  @click.prevent.stop="toggleMobileMenuTentsOpen"
                >
                  <div class="hamburger-menu" :class="{ 'animate': isMobileMenuOpen }" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <transition name="slide-down">
        <nav
          class="page-header--mobile d-flex flex-column justify-content-between"
          v-if="isMobileMenuOpen"
        >
          <ul
            class="page-header--mobile-links p-3 nav user-select-none font-serif-2 font-weight-normal mb-4 w-100"
          >
            <li class="w-100 nav-item nav-title font-serif">
              <router-link v-ripple to="/tents" class="nav-link px-0">Tents</router-link>
            </li>
            <div class="w-100">
              <hr class="my-2" />
            </div>
            <li class="w-100 nav-item">
              <router-link v-ripple to="/listing/wild-tents" class="nav-link px-0 py-1">Wild Tents</router-link>
            </li>
            <li class="w-100 nav-item">
              <router-link
                v-ripple
                to="/listing/waterfall-tents"
                class="nav-link px-0 py-1"
              >Waterfall Tents</router-link>
            </li>
            <li class="w-100 nav-item">
              <router-link
                v-ripple
                to="/listing/two-bedroom-tent"
                class="nav-link px-0 py-1"
              >Two Bedroom Tent</router-link>
            </li>
            <li class="w-100 nav-item nav-title font-serif mt-3">Things to Do</li>
            <div class="w-100">
              <hr class="my-2" />
            </div>
            <li class="w-100 nav-item">
              <router-link v-ripple to="/search/adventure" class="nav-link px-0 py-1">Adventures</router-link>
            </li>
            <li class="w-100 nav-item">
              <router-link
                v-ripple
                to="/search/food-and-drink"
                class="nav-link px-0 py-1"
              >Food and Drink</router-link>
            </li>
            <li class="w-100 nav-item">
              <router-link v-ripple to="/search/wellness" class="nav-link px-0 py-1">Wellness</router-link>
            </li>
            <div class="w-100 mt-3">
              <hr class="my-2" />
            </div>
            <li class="w-100 nav-item">
              <router-link v-ripple to="/contact" class="nav-link px-0 py-1">Contact</router-link>
            </li>
          </ul>
        </nav>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  z-index: $header-zindex;
}
.page-header--content {
  background: $primary;
  &-inner {
    box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.12),
      0px 16px 24px rgba(0, 0, 0, 0.14), 0px 8px 10px rgba(0, 0, 0, 0.2);
  }
}
.page-header--content,
.page-header--inner,
.page-header--ghost,
.page-header--nav .nav {
  height: rem($header-height-mobile);
  @include media-breakpoint-up(md) {
    height: rem($header-height);
  }
}
.page-header--nav {
  font-size: rem(18px);
  .nav-link {
    position: relative;
    line-height: rem($header-height);
    transition: color 250ms ease;
    &::before {
      transition: background-color 250ms ease;
      content: '';
      @include stick-around;
      position: absolute;
    }
    &:hover {
      &::before {
        background-color: rgba($white, 0.3);
      }
    }
  }
  .nav-item.dropdown.show {
    .nav-link {
      &::before {
        background-color: rgba($white, 0.3);
      }
    }
  }
}
.logo-link {
  width: rem(32px);
  height: rem(32px);
  @include media-breakpoint-up(md) {
    width: rem(44px);
    height: rem(44px);
  }
}
.font-serif {
  font-size: rem(16px * $serif-font-size-correction);
}
.page-header--mobile {
  width: 100%;
  height: calc(100vh - #{rem($header-height-mobile)});
  top: rem($header-height-mobile);
  @include media-breakpoint-up(md) {
    top: rem($header-height);
  }
  background: $brand-1;
  z-index: 10;
  .nav-link {
    color: $gray-2f;
  }
  .nav-title {
    font-size: rem(18px * $serif-font-size-correction);
    color: $primary;
    .nav-link {
      color: $primary;
    }
  }
  hr {
    background: darken($brand-1, 20%);
  }
}
.page-header--mobile-links {
  overflow-y: auto;
  [class*='slide-down'] & {
    overflow-y: hidden;
  }
}
@include media-breakpoint-down(sm) {
  .page-header--content {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 10;
  }
}
.dropdown-toggle {
  &::after {
    border: none;
    margin-left: rem(8px);
    background: no-repeat center
      url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE2IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC4xMzMzIDBMOCA0Ljk3Mjk3TDEuODY2NjcgMEwwIDEuNTEzNTFMOCA4TDE2IDEuNTEzNTFMMTQuMTMzMyAwWiIgZmlsbD0iI0ZGRkZGMCIvPjwvc3ZnPg==);
    width: rem(16px);
    height: rem(16px);
    vertical-align: -0.1rem;
  }
}
.dropdown-menu {
  margin-top: rem(-2px);
}
// Hamburger menu
$bar-width: rem(20px);
$bar-height: rem(2px);
$bar-spacing: rem(5px);
.hamburger-button {
  background: transparent;
  border: none;
  outline: none;
  width: rem(32px);
  height: rem(32px);
}
.hamburger-menu,
.hamburger-menu:after,
.hamburger-menu:before {
  width: $bar-width;
  height: $bar-height;
}

.hamburger-menu {
  position: relative;
  transform: translateY($bar-spacing);
  background: rgba(255, 255, 255, 1);
  transition: all 0ms 300ms;

  &.animate {
    background: rgba(255, 255, 255, 0);
  }
}

.hamburger-menu:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: $bar-spacing;
  background: rgba(255, 255, 255, 1);
  transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.hamburger-menu:after {
  content: '';
  position: absolute;
  left: 0;
  top: $bar-spacing;
  background: rgba(255, 255, 255, 1);
  transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.hamburger-menu.animate:after {
  top: 0;
  transform: rotate(45deg);
  transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.hamburger-menu.animate:before {
  bottom: 0;
  transform: rotate(-45deg);
  transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
}
</style>

<script lang="ts">
import Vue from 'vue'
import { getPassiveEventConfig } from '@/helpers'
import BaseImageLink from '@/components/BaseImageLink.vue'
let myBody = document.getElementsByTagName('body')[0]

export default Vue.extend({
  name: 'page-header',
  components: {
    BaseImageLink
  },
  data() {
    return {
      isDropdownTentsOpen: false,
      isMobileMenuOpen: false,
      isOpeningClosingMobileMenu: false
    }
  },
  mounted() {
    this.clickOutsideDropdownListener()
    window.addEventListener('resize', this.resetResponsiveMenu)
  },
  watch: {
    $route(to, from) {
      this.resetResponsiveMenu()
    }
  },
  methods: {
    clickOutsideDropdownListener() {
      document.addEventListener(
        'click',
        this.onClickOutsideDropdown,
        getPassiveEventConfig()
      )
    },
    toggleMobileMenuTentsOpen() {
      if (this.isOpeningClosingMobileMenu) {
        return
      }
      this.isOpeningClosingMobileMenu = true
      if (this.isMobileMenuOpen) {
        this.closeMobileMenu()
      } else {
        this.openMobileMenu()
      }
    },
    openMobileMenu() {
      myBody.classList.toggle('overflow-hidden')
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      setTimeout(() => {
        this.isOpeningClosingMobileMenu = false
      }, 300)
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      setTimeout(() => {
        myBody.classList.toggle('overflow-hidden')
        this.isOpeningClosingMobileMenu = false
      }, 300)
    },
    onClickOutsideDropdown() {
      this.isDropdownTentsOpen = false
    },
    resetResponsiveMenu() {
      myBody.classList.remove('overflow-hidden')
      this.isMobileMenuOpen = false
    }
  },
  destroyed() {
    document.removeEventListener('click', this.onClickOutsideDropdown)
    this.resetResponsiveMenu()
  }
})
</script>
