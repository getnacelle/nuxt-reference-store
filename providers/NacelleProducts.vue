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

    const nacelleProductsRemove = (products) => {
      nacelleProducts.list = nacelleProducts.list.filter((nacelleProduct) => {
        return !products.find(
          (product) => product.handle === nacelleProduct.handle
        )
      })
    }

    const nacelleProductsClear = () => {
      nacelleProducts.list = []
    }

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
