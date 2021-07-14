export default {
  title: 'Components | General'
}

export const RadioInput = () => ({
  data() {
    return {
      value: ''
    }
  },
  template: `
  <template>
    <div>
      <radio-input v-model="value" name="test" value="one"  label="First" :checked="true" />
      <radio-input v-model="value" name="test" value="two" label="Second" />
      <radio-input v-model="value" name="test" value="three" label="Third" />
    </div>
  </template>
  `
})

RadioInput.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
