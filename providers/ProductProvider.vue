<template>
  <div><slot /></div>
</template>
<script>
import { reactive, readonly, provide } from '@nuxtjs/composition-api'

export default {
  props: {
    products: {
      type: Array,
      default: null
    }
  },
  setup(props) {
    let productList = reactive([])

    /**
     * Helper function for getting product options
     * @param {Object} product
     * @returns {Object}
     */
    const getProductOptions = (product) => {
      const options = []
      product?.variants?.forEach((variant) => {
        variant?.selectedOptions?.forEach((selectedOption) => {
          let optionIndex = options.findIndex(
            (option) => option.name === selectedOption.name
          )
          if (optionIndex < 0) {
            options.push({ name: selectedOption.name, values: [] })
            optionIndex = options.length - 1
          }
          const value = options[optionIndex].values.find(
            (value) => value === selectedOption.value
          )
          if (!value) options[optionIndex].values.push(selectedOption.value)
        })
      })
      return options
    }

    /**
     * Set the products provider should track
     * @param {Array} products List of products
     * @returns {void}
     */
    const setProducts = (products) => {
      if (products) {
        productList = products.map((product) => ({
          ...product,
          options: getProductOptions(product)
        }))
      }
    }

    /**
     * Add products provider should track
     * @param {Array} products List of products
     * @returns {void}
     */
    const addProducts = (products) => {
      if (products) {
        productList = [
          ...productList,
          ...products
            .filter((product) => {
              return !productList.find((productItem) => {
                return productItem.handle === product.handle
              })
            })
            .map((product) => ({
              ...product,
              options: getProductOptions(product)
            }))
        ]
      }
    }

    /**
     * Remove products provider should track
     * @param {Array} products List of products
     * @returns {void}
     */
    const removeProducts = (products) => {
      productList = productList.filter((productItem) => {
        return !products.find(
          (product) => product.handle === productItem.handle
        )
      })
    }

    /**
     * Clear products provider should track
     * @returns {void}
     */
    const clearProducts = () => {
      productList = []
    }

    /**
     * Get products from provider by handles
     * @param {Array} handles List of product handles
     * @returns {Array}
     */
    const getProducts = (handles) => {
      return productList.filter((productItem) =>
        handles?.includes(productItem.handle)
      )
    }

    /**
     * Get selected variant of product from options
     * @param {Object} product Product to find variant from
     * @param {Array} options Options used to find selected variant
     * @returns {Object}
     */
    const getSelectedVariant = (product, options) => {
      if (options.length === 0) {
        return product.variants[0]
      } else {
        return product.variants.find((variant) => {
          return options.every((option) => {
            return variant.selectedOptions.some(
              (variantOption) =>
                JSON.stringify(variantOption) === JSON.stringify(option)
            )
          })
        })
      }
    }

    /**
     Initialize the providers products from props
     */
    addProducts(props.products)

    provide('products', readonly(productList))
    provide('setProducts', setProducts)
    provide('addProducts', addProducts)
    provide('removeProducts', removeProducts)
    provide('clearProducts', clearProducts)
    provide('getProducts', getProducts)
    provide('getSelectedVariant', getSelectedVariant)
  }
}
</script>
