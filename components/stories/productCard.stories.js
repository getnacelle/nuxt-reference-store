import StoryRouter from 'storybook-vue-router'
import productModule from '~/store/product/productModule'
import { defaultProduct } from '~/tests/mocks/defaultObjects'

export default {
  title: 'Components | Product / Product Card',

  decorators: [
    StoryRouter(),
    () => {
      return {
        template: `
          <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
        `
      }
    }
  ]
}

export const Default = () => ({
  template: '<product-card :product="product"/>',
  data() {
    return {
      namespace: '',
      product: defaultProduct
    }
  },
  created() {
    this.namespace = `product/${this.product.handle}`
    if (!this.$store.hasModule(this.namespace)) {
      this.$store.registerModule(this.namespace, productModule(), {
        preserveState: !!this.$store.state[this.namespace]
      })
    }
  }
})

Default.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
