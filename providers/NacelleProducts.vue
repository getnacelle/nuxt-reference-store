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

    const nacelleProductsSet = (products) => {
      if (products) {
        nacelleProducts.list = products.map((product) => ({
          ...product,
          options: helperGetProductOptions(product)
        }))
      }
    }
    nacelleProductsSet(props.products)

    const nacelleProductsByHandles = (handles) => {
      return nacelleProducts.list.filter((nacelleProduct) =>
        handles?.includes(nacelleProduct.handle)
      )
    }

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

    provide('nacelleProducts', readonly(nacelleProducts))
    provide('nacelleProductsSet', nacelleProductsSet)
    provide('nacelleProductsByHandles', nacelleProductsByHandles)
    provide('nacelleProductsSelectedVariant', nacelleProductsSelectedVariant)
  }
}
</script>
