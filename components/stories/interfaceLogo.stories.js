import StoryRouter from 'storybook-vue-router'

export default {
  title: 'Components | General',
  decorators: [StoryRouter()]
}

export const Logo = () => ({
  data() {
    return {
      src:
        'https://nacelle-assets.s3-us-west-2.amazonaws.com/nacelle-logo-dark.png'
    }
  },
  template: `<interface-logo :src='src'
  />`
})

Logo.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
