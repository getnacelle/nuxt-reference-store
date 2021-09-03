// Example products
export default [
  {
    handle: 'shirt',
    options: [{ name: 'color', values: ['blue', 'red'] }],
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
  },
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
