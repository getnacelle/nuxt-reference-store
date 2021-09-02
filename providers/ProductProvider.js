import { provide, ref, watch } from '@vue/composition-api'
import useSdk from '~/composables/useSdk'
import getProductOptions from '~/utils/getProductOptions'
import getSelectedVariant from '~/utils/getSelectedVariant'

export default {
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
     * Set the products provider should track
     * @param {Array} products List of products
     * @returns {void}
     */
    const setProducts = ({ products }) => {
      if (products) {
        productList.value = products.map((product) => ({
          ...product,
          selectedVariant: null,
          options: getProductOptions(product)
        }))
      }
    }

    /**
     * Add products provider should track
     * @param {Array} products List of products
     * @returns {void}
     */
    const addProducts = ({ products }) => {
      if (products) {
        productList.value = [
          ...productList.value,
          ...products
            .filter((product) => {
              return !productList.value.find((productItem) => {
                return productItem.handle === product.handle
              })
            })
            .map((product) => ({
              ...product,
              selectedVariant: null,
              options: getProductOptions(product)
            }))
        ]
      }
    }

    /**
     * Fetch the products provider should track
     * @param {Array} handles List of product handles
     * @param {String} provide Provide the products - options: set/add
     * @returns {void}
     */
    const fetchProducts = async ({ handles, method }) => {
      try {
        if (handles) {
          const handlesToFetch = handles.filter((handle) => {
            return !productList.value.find((productItem) => {
              return handle === productItem.handle
            })
          })
          const products = await sdk.data.products({ handles: handlesToFetch })
          if (method === 'add') addProducts({ products })
          if (method === 'set') setProducts({ products })
          return { products }
        }
      } catch (err) {
        return { error: err }
      }
    }

    /**
     * Remove products provider should track
     * @param {Array} handles List of product handles
     * @returns {void}
     */
    const removeProducts = ({ handles }) => {
      productList.value = productList.value.filter((productItem) => {
        return !handles.includes(productItem.handle)
      })
    }

    /**
     * Clear products provider should track
     * @returns {void}
     */
    const clearProducts = () => {
      productList.value = []
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
      setProducts({ products: value })
    })

    /**
     Pass down items to provide
    */
    provide('products', productList)
    provide('setProducts', setProducts)
    provide('addProducts', addProducts)
    provide('fetchProducts', fetchProducts)
    provide('removeProducts', removeProducts)
    provide('clearProducts', clearProducts)
    provide('setSelectedVariant', setSelectedVariant)
    provide('getProducts', getProducts)

    /**
     Render component
    */
    return context.slots.default
  }
}
