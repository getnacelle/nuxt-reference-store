<template>
  <div class="variant-select nacelle">
    <product-options
      v-if="product.variants.length > 1 && options && options.length"
      :options="options"
    >
      <template #swatch="{ option }">
        <product-option-swatch
          v-for="{ value } in option.values"
          :key="value"
          v-bind="{
            value,
            optionName: option.name,
            variants: product.variants,
            handle: product.handle,
            selectedVariant
          }"
          swatch-style="tab"
        />
      </template>
    </product-options>

    <slot name="above-button"></slot>
    <div class="columns is-mobile">
      <div v-if="showQuantitySelect" class="column auto">
        <quantity-selector :quantity.sync="quantity" />
      </div>
      <div class="column auto">
        <product-add-to-cart-button
          :product="product"
          :variant="selectedVariant"
          :quantity="quantity"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showQuantitySelect: {
      type: Boolean,
      default: true
    },
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    selectedVariant() {
      return this.$store.state[`product/${this.product.handle}`].selectedVariant
    },
    options() {
      return this.$store.state[`product/${this.product.handle}`].options
    }
  }
}
</script>

<style></style>
