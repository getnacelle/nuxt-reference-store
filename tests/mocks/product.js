export default {
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
}
