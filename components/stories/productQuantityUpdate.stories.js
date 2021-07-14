export default {
  title: 'Components | Product'
}

export const Quantity = () => ({
  data() {
    return {
      quantity: 0
    }
  },
  template: `
    <div class="section">
      <quantity-selector
        :quantity.sync="quantity"
      />
    </div>
  `,
  mounted() {}
})

Quantity.story = {
  parameters: {
    info: {
      summary: 'Increment or decrement quantity.'
    }
  }
}
