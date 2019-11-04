<template>
  <section class="page-footer py-4">
    <div class="container is-large">
      <div class="row flex-column-reverse flex-md-row">
        <div class="col-12 col-md-4">
          <div class="page-footer--logo">
            <div class="d-table m-auto ml-md-0">
              <router-link to="/" class="logo-link mt-2 d-block" title="Home">
                <img class="d-block mx-auto" src="https://res.cloudinary.com/ddwsbpkzk/image/upload/w_64/Shinta%20Mani%20Wild/home/Bensley_Collection_Shinta_ManiWild_brandmark_white_k9xfuy.png" alt="shinta mani wild" />
              </router-link>

              <div class="text-light text-center my-2">
                <p class="mb-0 font-serif-2">Bensley Collection</p>
                <p class="mb-2 font-serif-2">Shinta Mani Wild</p>
                <p class="mb-0 copyright">&copy;Bensley Collection. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8">
          <div class="row flex-column-reverse flex-md-row text-center text-md-left">
            <div class="col-12 col-md-6 links is-discover mb-4 mb-md-0">
              <nav>
                <h3 class="h3 font-serif-2 text-light">Discover</h3>
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link
                      to="/search/bensleys-favorite-seasons/"
                      class="nav-link font-weight-bold text-light"
                    >Bensley's Favorite Season</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/search/foundation/" class="nav-link font-weight-bold text-light">Foundation</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/search/conservation/" class="nav-link font-weight-bold text-light">Conservation</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/search/press/" class="nav-link font-weight-bold text-light">Press</router-link>
                  </li>
                  <li class="nav-item">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.bensleycollection.com/shintamani-siem-reap/"
                      class="nav-link font-weight-bold text-light"
                    >Visit Our Siem Reap Location</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-12 col-md-6 links is-connect mb-4 mb-md-0">
              <nav>
                <h3 class="h3 font-serif-2 text-small-caps text-light">Connect</h3>
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link
                      to="/contact"
                      class="nav-link font-weight-bold text-light"
                    >Contact</router-link>
                  </li>
                  <!-- <li class="nav-item">
                    <router-link
                      to="/subscribe"
                      class="nav-link font-weight-bold text-light text-decoration-underline"
                    >Subscribe</router-link>
                  </li> -->
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'page-footer'
})
</script>

<style lang="scss" scoped>
.page-footer {
  z-index: $footer-zindex;
  background-color: $primary;
  box-shadow: $box-shadow-sm-top, $box-shadow-md-top;
}
.links {
  font-size: rem(12px);
  .nav-link {
    padding: rem(2px 0);
  }
}
.copyright {
  font-size: rem(12px);
}
</style>
