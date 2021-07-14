import { withKnobs, boolean } from '@storybook/addon-knobs'
import productModule from '~/store/product/productModule'
import defaultMultivariate from '~/tests/mocks/multivariateProduct'

export default {
  title: 'Components | Product',
  decorators: [withKnobs]
}

export const VariantSelect = () => ({
  props: {
    showAtc: {
      default: boolean('Show Add to Cart', true)
    }
  },
  data() {
    return {
      namespace: '',
      product: defaultMultivariate,
      variant: defaultMultivariate.variants[0]
    }
  },
  methods: {
    onVariantSelect({ selectedVariant }) {
      this.variant = selectedVariant
    }
  },
  created() {
    this.namespace = `product/${this.product.handle}`
    if (!this.$store.hasModule(this.namespace)) {
      this.$store.registerModule(this.namespace, productModule(), {
        preserveState: !!this.$store.state[this.namespace]
      })
    }
  },
  template: `
  <section class="section">
    <div class="columns is-centered">
    <div class="columns is-marginless is-paddingless">
    <product-variant-select
      :product="product"
      v-on:variant-selected="onVariantSelect"
    />
  </div>
    </div>
  </section>`
})

VariantSelect.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
