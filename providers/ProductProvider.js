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
    },
    productHandle: {
      type: String,
      default: null
    }
  },
  setup(props, context) {
    const product = ref(props.product)
    const productHandle = ref(props.productHandle)
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
        productObject = await sdk?.data?.product({ handle })
        isFetching = false
      }
      if (productObject) {
        productProvided.value = {
          selectedOptions: null,
          selectedVariant: null,
          options: getProductOptions({ productObject }),
          ...productObject
        }
      }
    }

    /**
     * Set selected options of product
     * @param {Array} options Product options selected
     * @returns {Array}
     */
    const setSelectedOptions = ({ options }) => {
      if (!options) {
        console.warn(
          "[nacelle] ProductProvider's `setSelectedOptions` method requires a `options` parameter."
        )
      }
      productProvided.value = {
        ...productProvided.value,
        selectedOptions: options,
        selectedVariant: getSelectedVariant({
          product: productProvided.value,
          options
        })
      }
    }

    /**
     * Set selected variant of product
     * @param {Object} variant Variant object selected
     * @param {String} id Variant id selected
     * @returns {Array}
     */
    const setSelectedVariant = ({ variant, id }) => {
      if (!variant && !id) {
        console.warn(
          "[nacelle] ProductProvider's `setSelectedVariant` method requires a `variant` or `id` parameter."
        )
      }
      let selectedVariant = null
      if (variant) selectedVariant = variant
      else if (id) {
        selectedVariant = productProvided.value.variants?.find((variant) => {
          return variant.id === id
        })
      }
      if (selectedVariant) {
        productProvided.value = {
          ...productProvided.value,
          selectedOptions: selectedVariant.selectedOptions,
          selectedVariant
        }
      }
    }

    /**
     Initialize provider with product or productHandle props
     */
    if (props.product) {
      setProduct({ product: props.product })
    } else if (props.productHandle) {
      setProduct({ handle: props.productHandle })
    }

    /**
     Update provider with product or productHandle props
     */
    watch(product, (value) => {
      setProduct({ product: value })
    })
    watch(productHandle, (value) => {
      setProduct({ handle: value })
    })

    /**
     Provide values
    */
    provide('product', productProvided)
    provide('isFetching', isFetching)
    provide('setProduct', setProduct)
    provide('setSelectedOptions', setSelectedOptions)
    provide('setSelectedVariant', setSelectedVariant)

    /**
     Render component
    */
    return () => h('div', context.slots.default())
  }
}
