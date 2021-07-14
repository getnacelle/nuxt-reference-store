const trimProduct = (product) => {
  const {
    id,
    handle,
    locale,
    globalHandle,
    title,
    description,
    priceRange, // { min, max, currencyCode }
    availableForSale,
    tags,
    featuredMedia, // { thumbnailSrc, src, type, altText }
    indexedAt,
    variants
  } = product

  return {
    id,
    handle,
    locale,
    globalHandle,
    title,
    description,
    priceRange, // { min, max, currencyCode }
    availableForSale,
    tags,
    featuredMedia, // { thumbnailSrc, src, type, altText }
    indexedAt,
    variants: variants.map(trimVariant)
  }
}
const trimVariant = (variant) => {
  const {
    id,
    price,
    priceCurrency,
    compareAtPrice,
    selectedOptions, // { name, value }
    availableForSale
  } = variant

  return {
    id,
    price,
    priceCurrency,
    compareAtPrice,
    selectedOptions, // { name, value }
    availableForSale
  }
}

const transformProductData = (product) => {
  product = trimProduct(product)
  const { tags, variants, productType, ...rest } = product

  // Get product filter facets from variant data
  const variantOptions = variants.map((variant) => {
    return variant.selectedOptions
  })

  const variantFacets = variantOptions
    .reduce((acc, item) => {
      return acc.concat(item)
    }, [])
    .map((option) => JSON.stringify(option))

  const facets = Array.from(new Set(variantFacets))
    .map((option) => JSON.parse(option))
    .map((option) => {
      return { name: option.name.toLowerCase(), value: option.value }
    })

  // Get product filter facets from tags. Tags should be formatted "filter_property-name_value"
  const rootFacets = tags.filter((tag) => tag.includes('filter'))

  rootFacets.forEach((facet) => {
    const facetFragments = facet.split('_')
    const facetName = facetFragments[1]
    const facetValue = facetFragments[2] || true

    rest[facetName] = facetValue
    facets.push({ name: facetName, value: facetValue })
  })

  if (productType) {
    facets.push({ name: 'productType', value: productType })
  }

  // cast priceRange values as numbers
  rest.priceRange.min = Number(rest.priceRange.min)
  rest.priceRange.max = Number(rest.priceRange.max)
  rest.minPrice = rest.priceRange.min

  return { ...rest, productType, tags, variants, facets }
}

export default (products) => {
  return products.map(transformProductData)
}
