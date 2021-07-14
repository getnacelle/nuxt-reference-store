<template>
  <label :for="id">
    <input
      :id="id"
      :checked="preChecked"
      :name="name"
      :value="value"
      :aria-checked="currentlyChecked || preChecked"
      role="switch"
      type="radio"
      tabindex="0"
      @change="$emit('change', value)"
    />
    {{ label }}
  </label>
</template>

<script>
export default {
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentlyChecked() {
      return this.$attrs.inputValue === this.value
    },
    preChecked() {
      return (!this.$attrs.inputValue && this.checked) || this.currentlyChecked
    }
  }
}
</script>
