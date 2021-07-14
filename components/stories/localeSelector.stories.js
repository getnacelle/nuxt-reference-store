import { withKnobs } from '@storybook/addon-knobs'

import { defaultLocales } from '~/tests/mocks/defaultObjects'

export default {
  title: 'Components | Locale Selector',
  decorators: [withKnobs]
}

export const LocaleSelect = () => ({
  data() {
    return {
      localeList: defaultLocales.locales
    }
  },
  template: `
  <section class="section">
    <locale-selector
      :localeList="localeList"
    />
  </section>`
})

LocaleSelect.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
