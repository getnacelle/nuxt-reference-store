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

export const _CtaButton = () => ({
  data() {
    return {
      to: 'http://www.google.com'
    }
  },
  template: `
    <cta-button :to="to">
      CTA Button
    </cta-button>
  `
})

_CtaButton.story = {
  name: 'CTA Button',

  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
