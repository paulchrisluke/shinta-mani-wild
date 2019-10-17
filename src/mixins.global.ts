import Vue from 'vue'
import { transformCloudinaryUrl, getPosterImage } from '@/helpers'
import { cloudbedsBookingLink } from '@/constants/booking'
import { heroVideoRatio } from '@/constants/layout'
import vhFix from '@/mixins/vh-fix'

Vue.mixin({
  mixins: [vhFix],
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
