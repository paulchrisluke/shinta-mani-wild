import BaseHeading from '../src/components/BaseHeading.vue'

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
    :class-name="'h1 text-dark text-center mb-5'"
    :border-art="true"
  ></base-heading>
  `
})
