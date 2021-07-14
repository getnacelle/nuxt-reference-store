export default {
  title: 'Components | Main Nav',

  decorators: [
    () => {
      return {
        template: '<div style="padding: 3rem;"><story/></div>'
      }
    }
  ]
}

export const Burger = () => ({
  template: `
    <main-nav-burger />
  `
})

Burger.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
