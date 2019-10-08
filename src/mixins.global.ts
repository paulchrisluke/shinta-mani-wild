import Vue from 'vue'
import { transformCloudinaryUrl, getPosterImage } from '@/helpers'
import { cloudbedsBookingLink } from '@/constants/booking'
import { heroVideoRatio } from '@/constants/layout'

Vue.mixin({
  data() {
    return {
      pageWidth: document.body.clientWidth,
      cloudbedsBookingLink,
      heroVideoRatio
    }
  },
  methods: {
    transformCloudinaryUrl,
    getPosterImage
  }
})
