<template>
  <div class="page page--contact">
    <div class="page--content">
      <!-- header -->
      <page-header></page-header>

      <div class="mb-5">
        <hero-image 
          image="https://res.cloudinary.com/ddwsbpkzk/image/upload/q_auto:good/Shinta%20Mani%20Wild/home/Hero_Hero_aro2ji.jpg"
        ></hero-image>
      </div>

      <base-heading
        :text="title"
        :type="'h1'"
        :class-placeholder="'heading-placeholder mb-5'"
        :class-name="'h1 is-huge text-dark text-center mb-5'"
        :border-art="true"
      ></base-heading>

      <div class="container">
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <h1 class="font-serif text-dark mb-3 text-uppercase text-center">
              Ask Us anything
            </h1>
          </div>
        </div>
        <div class="row">
          <div class="col">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <div class="mb-3">
            <h1 class="font-serif text-dark text-uppercase">
              Call us
            </h1>
            <a href="tel:+85512223782">
              +855 12 223 782
            </a>
            <h1 class="font-serif text-dark text-uppercase">
              How to get here
            </h1>
            Southern Cardamom National Park
            <br>
            <a href="">
              View on Maps
            </a>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </p>
          </div>
          <div class="col">
            <form name="Contact" method="post" netlify ref="form" action="/thanks" data-netlify="true">
              <input type="hidden" name="form-name" value="Contact"/>
              <input
                placeholder="Name"
                class="input-field mb-4"
                type="text"
              />
              <input
                placeholder="E-mail"
                class="input-field mb-4"
                type="email"
              />
              <input
                placeholder="Subject"
                class="input-field mb-4"
                type="text"
              />
              <textarea
                placeholder="Message"
                class="input-field mb-4 d-block"
                type="text"
              />
              <base-button
                :text="'Submit'"
                :type="'submit'"
                :class-name="'d-block btn-secondary mb-4'"
              >
              </base-button>
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
import PageFooter from '@/components/PageFooter.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import HeroImage from '@/components/HeroImage.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'contact',
  components: {
    PageHeader,
    PageFooter,
    HeroImage,
    BaseHeading,
    BaseButton,
  },
  data() {
    return {
      title: 'Contact',
      name: '',
      email: '',
      phone: '',
      message: '',
    }
  },
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    .hero-image {
      height: rem($hero-height);

      @include hero-placeholder($hero-height);
    }
  }
  a {
    text-decoration: none;
    color: #000000;
    font-weight: bold;
  }
  form{
    input {
      background: transparent;
      border: 0.5px solid #2F2F2F;
      box-sizing: border-box;
      padding: 30px;
      margin-bottom: 30px;
      width: 100%;
      height: 50px;
    }
    textarea {
      background: transparent;
      border: 0.5px solid #2F2F2F;
      box-sizing: border-box;
      padding: 30px;
      margin-bottom: 30px;
      width: 100%;
      height: 265px;
    }
  }
  .submitButton {
    margin-bottom: 30px;
    width: 100%;
    height: 50px;
  }
</style>