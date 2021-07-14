<template>
  <div class="product-grid section nacelle">
    <div class="container">
      <slot name="header" :title="title">
        <component :is="titleTag" class="title has-text-centered">
          {{ title }}
        </component>
      </slot>
      <slot name="products" :products="products" :columns="columns">
        <product-grid :products="products" :columns="columns" />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 4
    },
    titleTag: {
      type: String,
      default: 'h3'
    }
  }
}
</script>

<style></style>
