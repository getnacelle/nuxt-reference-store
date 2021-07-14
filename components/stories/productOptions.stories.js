export default {
  title: 'Components | Product'
}

export const Options = () => ({
  data() {
    return {
      options: [
        {
          name: 'Size',
          values: ['xs', 'small', 'medium', 'large', 'xl', 'xxl']
        },
        {
          name: 'Shape',
          values: ['Oval', 'Triangle', 'Square']
        },
        {
          name: 'Color',
          values: ['white', 'red', 'blue']
        }
      ]
    }
  },
  template: '<product-options style="width:500px" :options="options"/>'
})

Options.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
