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
    products: {
      type: Array,
      default: null
    }
  },
  setup(props, context) {
    const productList = ref([])
    const products = ref(props.products)
    const { sdk } = useSdk(props.config)

    /**
     * Add products provider should track
     * @param {Array} products List of products
     * @param {Array} handles List of handles
     * @param {String} method Method of storing products - options: append, replace
     * @returns {void}
     */

    const addProducts = async ({ products, handles, method }) => {
      let newProducts = []
      if (products) {
        const uniqueProducts = products.filter((product) => {
          return !productList.value.find((productItem) => {
            return product.handle === productItem.handle
          })
        })
        newProducts = [...uniqueProducts]
      }
      if (handles) {
        const uniqueHandles = handles.filter((handle) => {
          return ![...productList.value, ...newProducts].find((productItem) => {
            return handle === productItem.handle
          })
        })
        if (uniqueHandles.length) {
          const fetchedProducts = await sdk.data.products({
            handles: uniqueHandles
          })
          if (fetchedProducts)
            newProducts = [...newProducts, ...fetchedProducts]
        }
      }
      newProducts = newProducts.map((newProduct) => ({
        ...newProduct,
        selectedVariant: null,
        options: getProductOptions({ product: newProduct })
      }))
      if (method === 'replace') {
        productList.value = newProducts
      } else {
        productList.value = [...productList.value, ...newProducts]
      }
    }

    /**
     * Remove products provider should track
     * @param {Object} config
     * @param {Array, null} handles List of product handles
     * @returns {void}
     */
    const removeProducts = ({ handles }) => {
      if (handles) {
        productList.value = productList.value.filter((productItem) => {
          return !handles.includes(productItem.handle)
        })
      } else {
        productList.value = []
      }
    }

    /**
     * Get products from provider by handles
     * @param {Array} handles List of product handles
     * @returns {Array}
     */
    const getProducts = ({ handles }) => {
      if (handles) {
        return productList.value.filter((productItem) =>
          handles?.includes(productItem.handle)
        )
      }
      return productList.value
    }

    /**
     * Set selected variant of product
     * @param {Object} product Product to set variant on
     * @param {Array} options Options to find selected variant
     * @returns {Array}
     */
    const setSelectedVariant = ({ product, options }) => {
      if (product && options) {
        const selectedVariant = getSelectedVariant({ product, options })
        const productIndex = productList.value.findIndex((productItem) => {
          return product.handle === productItem.handle
        })
        if (selectedVariant && productIndex >= 0) {
          productList.value = productList.value.map((productItem, index) => {
            if (productIndex === index) {
              return { ...productItem, selectedVariant }
            }
            return productItem
          })
        }
        return selectedVariant
      }
    }

    /**
     Initialize the provider products from props
     */
    addProducts({ products: props.products })

    /**
     Update the provider products from props
     */
    watch(products, (value) => {
      addProducts({ products: value, method: 'replace' })
    })

    /**
     Pass down items to provide
    */
    provide('products', productList)
    provide('addProducts', addProducts)
    provide('removeProducts', removeProducts)
    provide('setSelectedVariant', setSelectedVariant)
    provide('getProducts', getProducts)

    /**
     Render component
    */
    return () => h('div', context.slots.default())
  }
}
