import { text, array } from '@storybook/addon-knobs'
import { defaultProduct, defaultProduct2 } from '~/tests/mocks/defaultObjects'
import productModule from '~/store/product/productModule'

export default {
  title: 'Components | Product'
}

const productArray = [defaultProduct, defaultProduct2]

export const ProductShopLook = () => ({
  props: {
    imageSrc: {
      default: text(
        'ImageSrc',
        'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
      )
    },
    products: {
      default: array('Products', productArray)
    },
    buttonText: {
      default: text('ButtonText', 'Shop the look')
    }
  },
  data() {
    return {
      namespace: '',
      product: defaultProduct
    }
  },
  created() {
    this.namespace = `product/${this.products[0].handle}`
    if (!this.$store.hasModule(this.namespace)) {
      this.$store.registerModule(this.namespace, productModule(), {
        preserveState: !!this.$store.state[this.namespace]
      })
    }
  },
  template: `
  <product-shop-look
    :image-src="imageSrc"
    :products="products"
    :button-text="buttonText"
  >
    <template #product-card="{ product }">
      <slot name="product-card" :product="product" />
    </template>
  </product-shop-look>
  `
})

ProductShopLook.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
