<template>
  <section class="page-footer py-4">
    <div class="container is-large">
      <div class="row">
        <div class="col-4">
          <div class="page-footer--logo px-4">
            <div class="d-table">
              <a href="/" class="logo-link mt-2 d-block" title="Home">
                <img class="d-block mx-auto" src="~@/assets/img/logo-64.png" alt="shinta mani wild" />
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
            <div class="col-4 links is-discover">
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
            <div class="col-4 links is-connect">
              <nav>
                <h3 class="h3 font-serif text-uppercase text-light">Connect</h3>
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a
                      target="_blank"
                      href="https://www.facebook.com/ShintaManiAngkor/"
                      class="nav-link font-weight-bold text-light text-decoration-underline"
                    >Facebook</a>
                  </li>
                  <li class="nav-item">
                    <a
                      href="https://www.instagram.com/shintamani_angkor/"
                      target="_blank"
                      class="nav-link font-weight-bold text-light text-decoration-underline"
                    >Instagram</a>
                  </li>
                  <li class="nav-item">
                    <a
                      href="https://www.weibo.com/p/1006066222354993/home?from=page_100606&mod=TAB&is_all=1"
                      target="_blank"
                      class="nav-link font-weight-bold text-light text-decoration-underline"
                    >Weibo</a>
                  </li>
                  <li class="nav-item">
                    <a
                      target="_blank"
                      href="https://www.tripadvisor.com/Hotel_Review-g297390-d612090-Reviews-Shinta_Mani_Resort-Siem_Reap_Siem_Reap_Province.html"
                      class="nav-link font-weight-bold text-light text-decoration-underline"
                    >TripAdvisor</a>
                  </li>
                  <li class="nav-item">
                    <a
                      href
                      class="nav-link font-weight-bold text-light text-decoration-underline"
                    >Subscribe</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-4 links is-contact">
              <h3 class="h3 font-serif text-uppercase text-light">Connect</h3>
              <div class="text-light">
                <address class="d-block mb-1">
                  Hotel:
                  <a class="text-light" href="tel:+85512223782">+855 12 223 782</a>
                </address>
                <address class="d-block mb-1">
                  Reservation:
                  <a class="text-light" href="tel:+85512223782">+855 12 223 782</a>
                </address>
                <address class="d-block mb-1">Bensley Street, Kirirom, Cambodia</address>
                <a href class="text-light text-decoration-underline">View on Maps</a>
              </div>
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