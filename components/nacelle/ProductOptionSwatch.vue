<template>
  <div
    :class="[
      availableClass,
      stockClass,
      swatchNameClass,
      swatchSelectedClass,
      swatchStyle
    ]"
    class="option-swatch nacelle no-select"
    @click="setSelected"
  >
    <div
      v-if="swatchStyle == 'bubble'"
      :class="swatchClass"
      :style="swatchBg"
      class="inside-color"
    />
    <span v-else>{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    optionName: {
      type: String,
      default: ''
    },
    swatchStyle: {
      type: String,
      default: ''
    },
    variants: {
      type: Array,
      default: () => []
    },
    handle: {
      type: String,
      default: ''
    },
    selectedVariant: {
      type: Object,
      default: () => ({})
    }
  },
  asyncData({ $config: { contentAssetStorage } }) {
    return contentAssetStorage
  },
  data() {
    return {
      contentAssetStorage: ''
    }
  },
  computed: {
    optionAvailableForSale() {
      if (this.variants) {
        return this.variants
          .filter((variant) =>
            variant.selectedOptions.some(
              (option) => option.value === this.value
            )
          )
          .some((variant) => variant.availableForSale)
      }
      return null
    },
    optionAvailable() {
      // if this option were selected, test if there is a matching variant
      const productStore = this.$store.state[`product/${this.handle}/`]
      if (!productStore) {
        return false
      }

      const testSelectedOptions = productStore.selectedOptions.map(
        ({ name, value }) => ({ name, value })
      )
      const index = testSelectedOptions.findIndex(
        (item) => item.name === this.optionName
      )
      if (index > -1) {
        testSelectedOptions[index].value = this.value
      } else {
        testSelectedOptions.push({ name: this.optionName, value: this.value })
      }

      const optionAvailable = productStore.product.variants.some((variant) => {
        return testSelectedOptions.every((option) => {
          return variant.selectedOptions.some(
            (variantOption) =>
              JSON.stringify(variantOption) === JSON.stringify(option)
          )
        })
      })
      return optionAvailable
    },
    isSelected() {
      return this.selectedVariant?.selectedOptions?.some(
        (option) => option.value === this.value
      )
    },
    swatchClass() {
      if (this.value && this.optionName === 'Color') {
        const color = String(this.value)
        return `swatch-color-${color.toLowerCase()}`
      }

      return ''
    },
    swatchSrc() {
      if (!this.value) {
        return
      }
      const basePath = (process.env.contentAssetStorage || '').trimRight('/')
      return `${basePath}/swatches/${this.value}.png`
    },
    swatchBg() {
      return this.swatchSrc ? { background: `url(${this.swatchSrc})` } : null
    },

    swatchSelectedClass() {
      return this.isSelected ? 'selected' : 'not-selected'
    },
    stockClass() {
      return this.optionAvailableForSale ? 'in-stock' : 'out-of-stock'
    },
    availableClass() {
      return this.optionAvailable ? 'available' : 'not-available'
    },
    swatchNameClass() {
      return this.optionName ? `swatch-${this.optionName}` : ''
    }
  },
  methods: {
    setSelected() {
      if (this.optionAvailableForSale) {
        this.$store.dispatch(`product/${this.handle}/setSelected`, {
          name: this.optionName,
          value: this.value
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bubble,
.tab {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;
  &:first-child {
    margin-left: unset;
  }
  margin-bottom: 1rem;
}

.bubble {
  width: 2rem;
  height: 2rem;
  border: 1px solid #cecece;
  border-radius: 2rem;
  .inside-color {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
  }
}
.not-available {
  .inside-color {
    opacity: 0.5;
  }
}

.bubble.selected {
  transition: border 0.1s ease;
  border: 2px solid #a9a8a8;
}

.tab {
  transition: background-color 0.2s ease;
  border: 1px solid #a9a8a8;
  border-radius: 2px;
  padding: 0 0.5rem;
  height: 2rem;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9pt;
  text-transform: uppercase;
}

.tab.selected {
  background-color: #a9a8a8;
  color: white;
  font-weight: bold;
}

.swatch-color-red {
  background-color: rgb(148, 20, 20);
}

.swatch-color-blue {
  background-color: rgb(0, 68, 68);
}

.not-available {
  border: 1px solid #ccc;
  color: #ccc;
}
.out-of-stock {
  text-decoration: line-through;
  border: 1px dashed rgb(219, 219, 219);
  color: rgb(219, 219, 219);
  cursor: not-allowed;
}
</style>
