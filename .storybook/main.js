const stories = ['../components/**/*.stories.@(ts|js)']
const addons = [
  '@storybook/addon-docs',
  '@storybook/addon-essentials',
  '@storybook/addon-actions',
  '@storybook/addon-knobs',
  '@storybook/addon-links'
]

function nuxifyStorybook(storybookConfig) {
  return {
    ...storybookConfig,
    webpackFinal(config, options) {
      if (options.nuxtStorybookConfig) {
        config = options.nuxtStorybookConfig.webpackFinal(config, options)
      }
      if (typeof storybookConfig.webpackFinal === 'function') {
        config = storybookConfig.webpackFinal(config, options)
      }
      return config
    },
    stories: [...stories, ...storybookConfig.stories],
    addons: [...addons, ...storybookConfig.addons]
  }
}

module.exports = {
  webpackFinal(config, options) {
    return options.nuxtStorybookConfig.webpackFinal(config, options)
  },
  stories,
  addons,
  nuxifyStorybook
}
