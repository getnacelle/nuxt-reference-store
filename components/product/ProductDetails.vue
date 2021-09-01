<template>
  <div class="product-details">
    <div class="product-details__block">
      <h3 v-if="product && product.handle">
        <strong>Current Product:</strong>
        <span>{{ product.handle }}</span>
      </h3>
      <h4 v-if="product && product.handle">
        <strong>Selected Variant:</strong>
        <span>{{ product.selectedVariant }}</span>
      </h4>
      <em>** Will be empty if products have been cleared **</em>
      <div class="product-details__actions">
        <button @click="handleSetSelectedVariant">Set Selected Variant</button>
      </div>
    </div>
    <div class="product-details__block">
      <h3 v-if="products">
        <strong>Provided Products:</strong>
        <span v-for="product in products" :key="product.handle">
          {{ product.handle }}
        </span>
      </h3>
      <div class="product-details__actions">
        <button
          @click="handleFetchProducts(['johannah-boots', 'factor-low-tops'])"
        >
          Fetch Products ['johannah-boots', 'factor-low-tops']
        </button>
        <button @click="handleRemoveProducts(['factor-low-tops'])">
          Remove Products ['factor-low-tops']
        </button>
        <button @click="handleClearProducts">Clear Products</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import useProductProvider from '~/composables/useProductProvider'

export default defineComponent({
  props: {
    handle: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const {
      products,
      fetchProducts,
      removeProducts,
      clearProducts,
      getProducts,
      setSelectedVariant
    } = useProductProvider()
    const product = computed(() => getProducts([props.handle])[0])

    const handleSetSelectedVariant = () => {
      if (product.value) {
        const options = product.value.variants[0].selectedOptions
        setSelectedVariant({ product: product.value, options })
      }
    }

    const handleFetchProducts = (handles) => {
      fetchProducts({ handles, method: 'add' })
    }

    const handleRemoveProducts = (handles) => {
      removeProducts({ handles })
    }

    const handleClearProducts = () => {
      clearProducts()
    }

    return {
      product,
      products,
      handleSetSelectedVariant,
      handleFetchProducts,
      handleRemoveProducts,
      handleClearProducts
    }
  }
})
</script>

<style lang="scss" scoped>
.product-details {
  width: calc(100% - 40px);
  max-width: 700px;
  margin: 40px auto;
  text-align: center;
}
.product-details__block {
  margin-bottom: 50px;
  h3 {
    font-size: 22px;
    span {
      margin-left: 4px;
    }
  }
  h4 {
    font-size: 18px;
    span {
      margin-left: 4px;
    }
  }
  em {
    font-size: 12px;
  }
}
.product-details__actions {
  margin-top: 20px;
}
</style>
