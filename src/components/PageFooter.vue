<template>
  <section class="page-footer py-4">
    <div class="container is-large">
      <div class="row">
        <div class="col-4">
          <div class="page-footer--logo">
            <div class="d-table">
              <a href="/" class="logo-link mt-2 d-block" title="Home">
                <img class="d-block mx-auto" src="https://res.cloudinary.com/ddwsbpkzk/image/upload/w_64/Shinta%20Mani%20Wild/home/Bensley_Collection_Shinta_ManiWild_brandmark_white_k9xfuy.png" alt="shinta mani wild" />
              </a>

              <div class="text-light text-center my-2">
                <p class="mb-0 font-serif">Bensley Collection</p>
                <p class="mb-2 font-serif">Shinta Mani Wild</p>
                <p class="mb-0 copyright">&copy;Bensley Collection. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-6 links is-discover">
              <nav>
                <h3 class="h3 font-serif text-uppercase text-light">Discover</h3>
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a
                      href="/bensleys-favorite-seasons/"
                      class="nav-link font-weight-bold text-light"
                    >Bensley's Favorite Season</a>
                  </li>
                  <li class="nav-item">
                    <a href="/foundation/" class="nav-link font-weight-bold text-light">Foundation</a>
                  </li>
                  <li class="nav-item">
                    <a href="/conservation/" class="nav-link font-weight-bold text-light">Conservation</a>
                  </li>
                  <li class="nav-item">
                    <a href="/press/" class="nav-link font-weight-bold text-light">Press</a>
                  </li>
                  <li class="nav-item">
                    <a
                      href="/visit-our-siem-reap-location/"
                      class="nav-link font-weight-bold text-light"
                    >Visit Our Siem Reap Location</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-6 links is-connect">
              <nav>
                <h3 class="h3 font-serif text-uppercase text-light">Connect</h3>
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a
                      href="/contact"
                      class="nav-link font-weight-bold text-light text-decoration-underline"
                    >Contact</a>
                  </li>
                  <li class="nav-item">
                    <a
                      href="/subscribe"
                      class="nav-link font-weight-bold text-light text-decoration-underline"
                    >Subscribe</a>
                  </li>
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
  background-color: $primary;
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