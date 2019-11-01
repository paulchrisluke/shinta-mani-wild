import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

// documentation: https://vuetifyjs.com/en/customization/a-la-carte#manually-importing

Vue.use(Vuetify, {
  directives: {
    Ripple
  }
})

const opts = {}

export default new Vuetify(opts)
