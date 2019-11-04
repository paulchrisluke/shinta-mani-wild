import BaseHeading from '../src/components/BaseHeading.vue'
import '@/styles/global.scss'

export default {
  title: 'BaseHeading'
}

export const text = () => ({
  components: { BaseHeading },
  template: `
  <base-heading
    :show-placeholder="false"
    :text="'Heading text'"
    :type="'h1'"
    :class-name="'h1 text-dark text-center'"
    :border-art="true"
  ></base-heading>
  `
})
