<template>
  <!-- design file: https://www.figma.com/file/SiFZE7hhRKx2fWmrfZ3uy2RO/Shinta-Mani-Wild -->

  <div class="page page--home">
    <page-header></page-header>
    <div @click="showIntroVideo()" :class="{'has-image': !shouldShowIntroVideo}" class="hero">
      <!-- https://www.youtube.com/watch?v=SUWpCjzeMb4 -->
      <video-player
        :is-visible="shouldShowIntroVideo"
        source="https://www.youtube.com/embed/SUWpCjzeMb4"
      ></video-player>
    </div>

    <div class="container is-small">
      <div class="row my-5">
        <div class="column-12">
          <base-card :image="cardImage1">
            <template v-slot:text>
              <div class="card-content">
                <h2 class="h1 font-serif text-uppercase mb-4 text-center text-xl-left">
                  <span class="border-bottom border-dark pb-2">All Inclusive</span>
                </h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore laudantium excepturi ipsa aliquid aliquam ab perspiciatis. Incidunt architecto et ea illum placeat. Distinctio aliquam tempore eaque adipisci ipsa libero optio.</p>
                <p>Lorem, ipsum. Itaque dolores voluptate soluta minima recusandae cumque, quidem numquam corporis ab quibusdam tenetur aliquid amet optio asperiores provident. Facere illo mollitia eos quia odio provident minus cum, beatae eum. Error, cum aliquam laboriosam quo tenetur illo quia, aliquid atque modi temporibus dolorem earum.</p>
                <base-button @click="bookNow" :text="'Book Now'"></base-button>
              </div>
            </template>
          </base-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
const cardImage = require('@/assets/media/home-card-1.jpg')
const cardImageXs = require('@/assets/media/home-card-1--mobile.jpg')

export default Vue.extend({
  name: 'home',
  components: {
    PageHeader,
    VideoPlayer,
    BaseCard,
    BaseButton
  },
  data() {
    return {
      shouldShowIntroVideo: false,
      cardImage1: {
        alt: "All Inclusive",
        xl: {
          src: cardImage
        },
        default: {
          src: cardImageXs
        }
      }
    }
  },
  methods: {
    showIntroVideo() {
      this.shouldShowIntroVideo = true
    },
    bookNow() {
      console.log('book now...')
    }
  }
})
</script>

<style lang="scss" scoped>
.hero {
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: $black;
  iframe {
    max-width: 100%;
    max-height: calc(100vh - #{$header-height});
  }

  &.has-image {
    background: url('~@/assets/img/home-hero.jpg') no-repeat;
    background-size: cover;
    height: rem(800px - $header-height);
    cursor: pointer;
  }
}
.container.is-small {
  max-width: rem($container-small);
}
.card-content::v-deep .button-frame {
  width: rem(190px);
  height: rem(88px);
  background: url('~@/assets/img/button-book-now.png');
  background-size: rem(190px 88px);
}
</style>