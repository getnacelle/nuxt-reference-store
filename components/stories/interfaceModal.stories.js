import { withKnobs, button } from '@storybook/addon-knobs'
const label = 'Show Modal'

export default {
  title: 'Components | General',

  decorators: [
    withKnobs,
    () => ({
      template: '<div style="padding: 3rem;"><story/></div>'
    })
  ]
}

export const Modal = () => ({
  data() {
    return {
      open: true
    }
  },
  template: `
    <interface-modal :modalOpen="open" v-on:closeModal="open = false">
    <h1>This is a modal.</h1>
    <p>Great work!</p>
    </interface-modal>
  `,
  created() {
    button(label, () => {
      this.open = true
    })
  }
})

Modal.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
