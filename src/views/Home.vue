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

    <div class="pattern-area-1 py-5 pt-xl-2 position-relative">
      <div class="shift-down position-relative">
        <base-heading :type="'h1'" :class-name="'h1 text-center'">Shinta Mani Wild</base-heading>

        <section class="container">
          <base-quote :image="quoteImage1">
            <p class="mb-0">
              “A game-changing luxury tented camp built along a river valley in the waterfall-laced Cambodian rainforest. With an ethos of eco, Wild’s funds are used to preserve its surrounding private nature sanctuary from poaching, mining and logging - a stay will
              make you feel like you’re at the front line of conservation.”
            </p>
            <p>Stephanie Cavagnaro, The Telegraph UK</p>
          </base-quote>
        </section>
      </div>

      <div class="container is-small">
        <div class="row">
          <div class="column-12">
            <base-card :image="cardImage1">
              <template v-slot:text>
                <div class="card-content">
                  <base-heading
                    :type="'h2'"
                    :class-name="'h2 text-center text-xl-left'"
                  >All Inclusive</base-heading>
                  <p>Shinta Mani Wild is a radical new fusion of world-class design, hospitality and conservation. The camp was born when world-renowned designer Bill Bensley identified an unprotected, 350-hectare wildlife corridor – and set out to save it from poaching, mining and logging. Sustainability informs everything we do, hence our partnership with the Wildlife Alliance (whose rangers have an onsite station), and our resident naturalists, who assist our chef. The Shinta Mani Foundation spearheads our conservation and community outreach programmes.</p>
                  <base-button @click="bookNow" :text="'Book Now'"></base-button>
                </div>
              </template>
            </base-card>
          </div>
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
import BaseHeading from '@/components/BaseHeading.vue'
import BaseQuote from '@/components/BaseQuote.vue'
const cardImage = require('@/assets/media/home-card-1.jpg')
const cardImageXs = require('@/assets/media/home-card-1--mobile.jpg')
const quoteImage1 = require('@/assets/media/home/dog-bubble-1.png')

export default Vue.extend({
  name: 'home',
  components: {
    PageHeader,
    VideoPlayer,
    BaseCard,
    BaseButton,
    BaseHeading,
    BaseQuote
  },
  data() {
    return {
      shouldShowIntroVideo: false,
      cardImage1: {
        alt: 'All Inclusive',
        xl: {
          src: cardImage
        },
        default: {
          src: cardImageXs
        }
      },
      quoteImage1: {
        default: {
          src: quoteImage1
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
.pattern-area-1 {
  @include media-breakpoint-up(xl) {
    &::before {
      content: '';
      display: block;
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: url('~@/assets/media/home/tigers1-fill.png') no-repeat top;
      background-size: 100%;
    }
  }
}
.shift-down {
  @include media-breakpoint-up(xl) {
    top: rem(40px);
  }
}
</style>