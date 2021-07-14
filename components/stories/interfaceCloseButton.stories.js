export default {
  title: 'Components | General',

  decorators: [
    () => {
      return {
        template: '<div style="padding: 3rem;"><story/></div>'
      }
    }
  ]
}

export const CloseButton = () => ({
  template: `
    <interface-close-button/>
  `
})

CloseButton.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
