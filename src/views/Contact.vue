<template>
  <!-- design: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild?node-id=553%3A6283 -->
  <div class="page page--contact">
    <div class="page--content">
      <!-- header -->
      <page-header></page-header>

      <!-- player -->
      <div class="hero position-relative">
        <video-player
          v-if="resort.id"
          :source="resort.name"
          :poster="transformCloudinaryUrl(resort.featuredImage, `q_auto:good,w_${pageWidth},ar_${heroVideoRatio},c_fill,g_west`)"
          :rest="{autoplay: true, muted: false, loop: false}"
        ></video-player>
      </div>

      <div class="container is-small page-description clearfix my-5">
        <article>
          <base-heading
            :show-placeholder="!resort.id"
            :text="resort.title"
            :type="'h1'"
            :class-placeholder="'heading-placeholder mb-5'"
            :class-name="'h1 font-size-xl-huge text-dark text-center mb-5'"
            :border-art="true"
          ></base-heading>

          <div v-if="!resort.id">
            <content-placeholders centered rounded class="description-placeholder">
              <content-placeholders-text :lines="3" />
            </content-placeholders>
          </div>
          <p
            v-else
            class="mb-0 px-3"
            v-read-more="{lineHeight: 24, lines: 3, linkClass: 'd-block float-left px-3'}"
            v-text="resort.description"
          ></p>
        </article>
      </div>

      <div class="container is-small mb-5">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="mb-3 ">
              <h2 class="font-sans-serif text-dark mb-3 text-small-caps font-weight-normal">Call us</h2>
              <div class="d-flex">
                <img
                  class="mx-3 align-middle"
                  src="https://res.cloudinary.com/ddwsbpkzk/image/upload/w_32/Shinta%20Mani%20Wild/general/icon-phone_gcrzyg.png"
                  alt="phone"
                />
                <a class="contact--phone" href="tel:+85512223782">+855 12 223 782</a>
              </div>
            </div>

            <div class="mb-3">
              <h2 class="font-sans-serif text-dark mb-3 text-small-caps font-weight-normal">How to get here</h2>
              <div class="d-flex">
                <img
                  class="mx-3 align-middle"
                  src="https://res.cloudinary.com/ddwsbpkzk/image/upload/w_32/Shinta%20Mani%20Wild/general/icon-address_xsksp1.png"
                  alt="map"
                />
                <div class="d-flex flex-column">
                  <p class="mb-0">Southern Cardamom National Park</p>
                  <a href="https://www.google.com/maps/place/Bensley+Collection+-+Shinta+Mani+Wild/@11.189482,103.936634,11z/data=!4m8!3m7!1s0x0:0x84ce6d5a9dbf9706!5m2!4m1!1i2!8m2!3d11.1894822!4d103.9366345?hl=th" target="_blank">
                    <b>View on Maps</b>
                  </a>
                </div>
              </div>
            </div>

            <div class="contact--content">
              <p>The journey to Wild takes approximately 2 hours by road from Sihanoukville (KOS) Airport and 3 hours from Phnom Penh (PNH) Airport, and we can arrange pick up from both city centre vicinity if you are coming from coastal Cambodia and continuing to the capital. There are daily flights connecting the cultural heart of Siem Reap (REP) to both airports, and the flight time is approximately 50 mins.</p>

              <p>Direct flight from Bangkok (DMK/BKK) to Sihanoukville (KOS) was launched this year with AirAsia and JC Airlines on selected day of week. Starting from 1st January 2020 Bangkok Airways will be flying daily between the two cities.</p>

              <p>Wild is accessible by private helicopter from Phnom Penh, Sihanoukville and Siem Reap, information and cost available upon request.</p>
            </div>
          </div>
          <div class="col-6">
            <form
              name="Contact"
              method="post"
              netlify
              ref="form"
              action="/thanks"
              data-netlify="true"
            >
              <h2 class="font-sans-serif text-dark mb-3 text-small-caps text-center font-weight-normal">Ask Us Anything</h2>

              <input type="hidden" name="form-name" value="Contact" />
              <input name="Name" placeholder="Name" class="contact--input-name input-field mb-4" type="text" />
              <input
                name="E-mail"
                placeholder="E-mail"
                class="contact--input-email input-field mb-4"
                type="email"
              />
              <input
                name="Subject"
                placeholder="Subject"
                class="contact--input-message input-field mb-4"
                type="text"
              />
              <textarea name="Message" placeholder="Message" class="contact--input-text input-field mb-4 d-block" type="text" />
              <base-image-link
                :class-name="'is-primary is-md w-100'"
                :type="'submit'"
                :text="'Submit'"
              ></base-image-link>
            </form>
          </div>
        </div>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import PageFooter from '@/components/PageFooter.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import HeroImage from '@/components/HeroImage.vue'
import BaseImageLink from '@/components/BaseImageLink.vue'
import { Resort } from '../types'

export default {
  name: 'contact',
  components: {
    PageHeader,
    VideoPlayer,
    PageFooter,
    HeroImage,
    BaseHeading,
    BaseImageLink
  },
  data() {
    return {
      slug: 'contact',
      title: 'Contact',
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  },
  computed: {
    resort(): Resort {
      return (this as any).$store.getters['resort/getItem']
    }
  },
  mounted() {
    (this as any).$store.dispatch('resort/getItemBySlug', (this as any).slug)
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: $black;
  font-weight: bold;
}
form {
  input {
    background: transparent;
    border: 1px solid $gray-2f;
    box-sizing: border-box;
    padding: rem(32px);
    margin-bottom: rem(32px);
    width: 100%;
    height: 50px;
  }
  textarea {
    background: transparent;
    border: 1px solid $gray-2f;
    box-sizing: border-box;
    padding: rem(32px);
    margin-bottom: rem(32px);
    width: 100%;
    height: rem(256px);
  }
}
.contact--phone {
  line-height: rem(32px);
}
.contact--input-name {
  background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_64,q_auto:best/Shinta%20Mani%20Wild/general/icon-name_zo5gaf.png')
    no-repeat right #{rem(16px)} center;
  background-size: rem(32px);
}
.contact--input-email {
  background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_64,q_auto:best/Shinta%20Mani%20Wild/general/icon-email_erfxz7.png')
    no-repeat right #{rem(16px)} center;
  background-size: rem(32px);
}
.contact--input-message {
  background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/h_64,q_auto:best/Shinta%20Mani%20Wild/general/icon-message_jjsjja.png')
    no-repeat right #{rem(16px)} center;
  background-size: rem(32px);
}
</style>