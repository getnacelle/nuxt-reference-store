import StoryRouter from 'storybook-vue-router'

export default {
  title: 'Components | Main Nav',
  decorators: [StoryRouter()]
}

export const _MainNav = () => ({
  template: `
    <main-nav />
  `
})

_MainNav.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
