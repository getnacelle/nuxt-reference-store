export default ({ product, fallbackPrice, locale }) => {
  if (product.priceRange.currencyCode === locale.currency) {
    return new Intl.NumberFormat(product.locale, {
      style: 'currency',
      currency: product.priceRange.currencyCode
    }).format(fallbackPrice)
  }

  let priceForCurrency
  for (let i = 0; i < product.variants.length; i++) {
    if (product.variants[i].priceRules) {
      for (let u = 0; u < product.variants[i].priceRules.length; u++) {
        if (
          product.variants[i].priceRules[u].priceCurrency === locale.currency &&
          (!priceForCurrency ||
            priceForCurrency < product.variants[i].priceRules[u].price)
        ) {
          priceForCurrency = product.variants[i].priceRules[u].price
          break
        }
      }
    }
  }

  const currencyToDisplay = {
    locale: priceForCurrency ? locale.locale : product.locale,
    currency: priceForCurrency
      ? locale.currency
      : product.priceRange.currencyCode,
    price: priceForCurrency || fallbackPrice
  }
  const formattedCurrency = new Intl.NumberFormat(currencyToDisplay.locale, {
    style: 'currency',
    currency: currencyToDisplay.currency
  }).format(currencyToDisplay.price)
  return priceForCurrency
    ? `${formattedCurrency} ${locale.currency}`
    : formattedCurrency
}
