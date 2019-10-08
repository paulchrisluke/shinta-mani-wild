import Vue from 'vue'
import { transformCloudinaryUrl, getPosterImage } from '@/helpers'
import { cloudbedsBookingLink } from '@/constants/booking'

Vue.mixin({
  data() {
    return {
      cloudbedsBookingLink
    }
  },
  methods: {
    transformCloudinaryUrl,
    getPosterImage
  }
})
