export default (routeConfig) => {
  const paths = {
    page: '/pages',
    blog: '',
    article: '',
    content: '',
    collection: '/collections',
    product: '/products'
  }

  if (routeConfig) {
    if (typeof routeConfig.page !== 'undefined') {
      paths.page = routeConfig.page
    }

    if (typeof routeConfig.blog !== 'undefined') {
      paths.blog = routeConfig.blog
    }

    if (typeof routeConfig.article !== 'undefined') {
      paths.article = routeConfig.article
    }

    if (typeof routeConfig.content !== 'undefined') {
      paths.content = routeConfig.content
    }

    if (typeof routeConfig.collection !== 'undefined') {
      paths.collection = routeConfig.collection
    }

    if (typeof routeConfig.product !== 'undefined') {
      paths.product = routeConfig.product
    }
  }

  return paths
}
