import { h, provide, ref, watch } from '@nuxtjs/composition-api'
import useSdk from '~/composables/useSdk'
import getProductOptions from '~/utils/getProductOptions'
import getSelectedVariant from '~/utils/getSelectedVariant'

export default {
  name: 'ProductProvider',
  props: {
    config: {
      type: Object,
      default: null
    },
    product: {
      type: Object,
      default: null
    }
  },
  setup(props, context) {
    const product = ref(props.product)
    const productProvided = ref(null)
    let isFetching = ref(false)

    const config = props.config || null
    const { sdk } = useSdk({ config })

    /**
     * Set product provider should track
     * @param {Object} config
     * @param {Object} product Product object to track
     * @param {String} handle Product handle to track
     * @returns {void}
     */
    const setProduct = async ({ product, handle }) => {
      if (!product && !handle) {
        console.warn(
          "[nacelle] ProductProvider's `setProduct` method requires a `product` or `handle` parameter."
        )
        return
      }
      let productObject = {}
      if (product) productObject = product
      else if (handle) {
        isFetching = true
        productObject = await sdk.data.product({ handle })
        isFetching = false
      }
      productProvided.value = {
        selectedVariant: null,
        options: getProductOptions({ product }),
        ...productObject
      }
    }

    /**
     * Set selected variant of product
     * @param {Array} options Product options selected
     * @returns {Array}
     */
    const setSelectedVariant = ({ options }) => {
      if (!options) {
        console.warn(
          "[nacelle] ProductProvider's `setSelectedVariant` method requires a `options` parameter."
        )
      }
      productProvided.value = {
        ...productProvided.value,
        selectedVariant: getSelectedVariant({
          product: productProvided.value,
          options
        })
      }
    }

    /**
     Initialize provider with product from props
     */
    if (props.product) {
      setProduct({ product: props.product })
    }

    /**
     Update provider with product from props
     */
    watch(product, (value) => {
      setProduct({ product: value })
    })

    /**
     Provide values
    */
    provide('product', productProvided)
    provide('isFetching', isFetching)
    provide('setProduct', setProduct)
    provide('setSelectedVariant', setSelectedVariant)

    /**
     Render component
    */
    return () => h('div', context.slots.default())
  }
}
