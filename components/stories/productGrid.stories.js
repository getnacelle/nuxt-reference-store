import { defaultMultivariate } from '~/tests/mocks/defaultObjects'
import productModule from '~/store/product/productModule'

const productArray = [
  { ...defaultMultivariate },
  { ...defaultMultivariate },
  { ...defaultMultivariate }
]

productArray[0].handle = 'shirt-1'
productArray[1].handle = 'shirt-2'
productArray[2].handle = 'shirt-3'

export default {
  title: 'Components | Product / Product Grid'
}

export const ProductGrid = () => ({
  data() {
    return {
      title: 'Product Grid',
      products: productArray
    }
  },
  created() {
    this.products.forEach((product) => {
      const namespace = `product/${product.handle}`
      if (!this.$store.hasModule(namespace)) {
        this.$store.registerModule(namespace, productModule(), {
          preserveState: !!this.$store.state[namespace]
        })
        this.$store.dispatch(`${namespace}/setupProduct`, product)
      }
      this.$store.dispatch(`${namespace}/storeProduct`, product)
    })
  },
  template: `<div>
  <product-grid :products="products" :showAddToCart="true" :showQuantityUpdate="true"/>
  </div>`
})

ProductGrid.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
