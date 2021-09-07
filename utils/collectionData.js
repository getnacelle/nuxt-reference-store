// Example collections
export default [
  {
    handle: 'shirts',
    productLists: [{ handles: ['shirt'] }],
    products: [
      {
        handle: 'shirt',
        variants: [
          {
            name: 'blue-shirt',
            selectedOptions: [{ name: 'color', value: 'blue' }]
          },
          {
            name: 'red-shirt',
            selectedOptions: [{ name: 'color', value: 'red' }]
          }
        ]
      }
    ]
  },
  {
    handle: 'hats',
    productLists: [{ handles: ['hat'] }],
    products: [
      {
        handle: 'hat',
        options: [{ name: 'size', values: ['small', 'large'] }],
        variants: [
          {
            name: 'small-hat',
            selectedOptions: [{ name: 'size', value: 'small' }]
          },
          {
            name: 'large-hat',
            selectedOptions: [{ name: 'size', value: 'large' }]
          }
        ]
      }
    ]
  }
]
