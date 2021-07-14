import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'
import Logo from '../static/nacelle-horizontal-dark.svg'

const themeConfig = create({
  base: 'light',
  brandTitle: '',
  brandImage: Logo
})

addons.setConfig({
  theme: themeConfig
})
