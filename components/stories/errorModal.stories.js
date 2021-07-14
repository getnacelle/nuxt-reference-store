import { withKnobs, button } from '@storybook/addon-knobs'
const label = 'Trigger Error'

export default {
  title: 'Components | General',

  decorators: [
    withKnobs,
    () => ({
      template: '<div style="padding: 3rem;"><story/></div>'
    })
  ]
}

export const _ErrorModal = () => ({
  mounted() {
    this.$store.commit('cart/setCartError', 'this is an error')
  },
  template: `
    <error-modal/>
  `,
  created() {
    button(label, () => {
      this.$store.commit('cart/setCartError', 'this is an error')
    })
  }
})

_ErrorModal.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
