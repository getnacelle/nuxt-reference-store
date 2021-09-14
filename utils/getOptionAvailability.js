/**
 * Util for checking product option availability
 * @param {Object} product
 * @param {Object} option
 * @returns {Boolean}
 */

export default ({ product, option }) => {
  const selectedOptions = product.selectedOptions
  const optionSelected = selectedOptions.findIndex(
    (item) => item.name === option.name
  )
  if (!optionSelected) {
    selectedOptions.push(option)
  }
  return product.variants?.some((variant) => {
    return selectedOptions.every((selectedOption) => {
      return variant.selectedOptions.some(
        (variantOption) =>
          JSON.stringify(selectedOption) === JSON.stringify(variantOption)
      )
    })
  })
}
