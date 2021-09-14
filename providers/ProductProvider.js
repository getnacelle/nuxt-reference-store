import { h, provide, ref, watch } from '@nuxtjs/composition-api'
import useSdk from '~/composables/useSdk'
import getProductOptions from '~/utils/getProductOptions'
import getSelectedVariant from '~/utils/getSelectedVariant'

export default {
  name: 'ProductProvider',
  props: {
    config: {
      type: Object,
<<<<<<< HEAD
      default: null
    },
    product: {
      type: Object,
      default: null
    },
    productHandle: {
      type: String,
      default: null
=======
      default: () => ({})
    },
    product: {
      type: Object,
      default: () => ({})
    },
    productHandle: {
      type: String,
      default: ''
>>>>>>> 3717ac2c0e60caf5a31b4417954a7aa09bc56215
    }
  },
  setup(props, context) {
    const product = ref(props.product)
    const productHandle = ref(props.productHandle)
    const productProvided = ref(null)
    let isFetching = ref(false)

<<<<<<< HEAD
    const config = props.config || null
    const { sdk } = useSdk({ config })
=======
    const config = props.config
    const sdk = useSdk({ config })
>>>>>>> 3717ac2c0e60caf5a31b4417954a7aa09bc56215

    /**
     * Set product provider should track
     * @param {Object} config
     * @param {Object} product Product object to track
     * @param {String} handle Product handle to track
     * @returns {void}
     */
    const setProduct = async ({ product, handle }) => {
<<<<<<< HEAD
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
      if (productObject) {
        productProvided.value = {
          selectedOptions: null,
          selectedVariant: null,
          options: getProductOptions({ productObject }),
          ...productObject
        }
=======
      try {
        if (!product && !handle) {
          console.warn(
            "[nacelle] ProductProvider's `setProduct` method requires a `product` or `handle` parameter."
          )
          return
        }
        let productObject = {}
        if (product && Object.keys(product).length) productObject = product
        else if (handle) {
          isFetching = true
          productObject = await sdk.data.product({ handle })
          isFetching = false
        }
        if (productObject && Object.keys(productObject).length) {
          productProvided.value = {
            selectedOptions: null,
            selectedVariant: null,
            options: getProductOptions({ productObject }),
            ...productObject
          }
        }
      } catch (err) {
        console.warn(`Error: ${err}`)
        isFetching = false
>>>>>>> 3717ac2c0e60caf5a31b4417954a7aa09bc56215
      }
    }

    /**
     * Set selected options of product
     * @param {Array} options Product options selected
     * @returns {Array}
     */
    const setSelectedOptions = ({ options }) => {
<<<<<<< HEAD
      if (!options) {
        console.warn(
          "[nacelle] ProductProvider's `setSelectedOptions` method requires a `options` parameter."
        )
=======
      if (Array.isArray(options) && !options.length) {
        console.warn(
          "[nacelle] ProductProvider's `setSelectedOptions` method requires a `options` parameter."
        )
        return
>>>>>>> 3717ac2c0e60caf5a31b4417954a7aa09bc56215
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
<<<<<<< HEAD
     * @returns {Array}
=======
>>>>>>> 3717ac2c0e60caf5a31b4417954a7aa09bc56215
     */
    const setSelectedVariant = ({ variant, id }) => {
      if (!variant && !id) {
        console.warn(
          "[nacelle] ProductProvider's `setSelectedVariant` method requires a `variant` or `id` parameter."
        )
<<<<<<< HEAD
=======
        return
>>>>>>> 3717ac2c0e60caf5a31b4417954a7aa09bc56215
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
<<<<<<< HEAD
    if (props.product) {
=======
    if (props.product && Object.keys(props.product).length) {
>>>>>>> 3717ac2c0e60caf5a31b4417954a7aa09bc56215
      setProduct({ product: props.product })
    } else if (props.productHandle) {
      setProduct({ handle: props.productHandle })
    }

    /**
     Emit product to parent for v-model use
     */
    watch(
      productProvided,
      (value) => {
        context.emit('input', value)
      },
      { immediate: true }
    )

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
    return () => h('div', context.slots.default && context.slots.default())
  }
}
