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
    const nacelleProducts = reactive({
      list: []
    })

    /**
     * Helper function for getting product options
     * @param {Object} product
     * @returns {Object}
     */
    const helperGetProductOptions = (product) => {
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
    const nacelleProductsSet = (products) => {
      if (products) {
        nacelleProducts.list = products.map((product) => ({
          ...product,
          options: helperGetProductOptions(product)
        }))
      }
    }

    /**
     * Add products provider should track
     * @param {Array} products List of products
     * @returns {void}
     */
    const nacelleProductsAdd = (products) => {
      if (products) {
        const productAdds = products.filter((product) => {
          return !nacelleProducts.list.find((nacelleProduct) => {
            return nacelleProduct.handle === product.handle
          })
        })
        nacelleProducts.list = [
          ...nacelleProducts.list,
          ...productAdds.map((product) => ({
            ...product,
            options: helperGetProductOptions(product)
          }))
        ]
      }
    }

    /**
     * Remove products provider should track
     * @param {Array} products List of products
     * @returns {void}
     */
    const nacelleProductsRemove = (products) => {
      nacelleProducts.list = nacelleProducts.list.filter((nacelleProduct) => {
        return !products.find(
          (product) => product.handle === nacelleProduct.handle
        )
      })
    }

    /**
     * Clear products provider should track
     * @returns {void}
     */
    const nacelleProductsClear = () => {
      nacelleProducts.list = []
    }

    /**
     * Get products from provider by handles
     * @param {Array} handles List of product handles
     * @returns {Array}
     */
    const nacelleProductsByHandles = (handles) => {
      return nacelleProducts.list.filter((nacelleProduct) =>
        handles?.includes(nacelleProduct.handle)
      )
    }

    /**
     * Get selected variant of product from options
     * @param {Object} product Product to find variant from
     * @param {Array} options Options used to find selected variant
     * @returns {Object}
     */
    const nacelleProductsSelectedVariant = (product, options) => {
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
    nacelleProductsAdd(props.products)

    provide('nacelleProducts', readonly(nacelleProducts))
    provide('nacelleProductsSet', nacelleProductsSet)
    provide('nacelleProductsAdd', nacelleProductsAdd)
    provide('nacelleProductsRemove', nacelleProductsRemove)
    provide('nacelleProductsClear', nacelleProductsClear)
    provide('nacelleProductsByHandles', nacelleProductsByHandles)
    provide('nacelleProductsSelectedVariant', nacelleProductsSelectedVariant)
  }
}
</script>
