export default {
  title: 'Components | Product'
}

export const Price = () => ({
  data() {
    return {
      price: '29.59'
    }
  },
  template: '<product-price :price="price" show-currency-code></product-price>'
})

Price.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
