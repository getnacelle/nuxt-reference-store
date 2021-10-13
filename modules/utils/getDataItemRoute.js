export default (item, routeConfig) => {
  const { type, handle, blogHandle } = item
  let route = ''

  switch (type) {
    case 'product':
      route = `${routeConfig.product}/${handle}`
      break
    case 'collection':
      route = `${routeConfig.collection}/${handle}`
      break
    case 'blog':
      route = `${routeConfig.blog}/${handle}`
      break
    case 'article':
      if (typeof blogHandle !== 'undefined') {
        route = `${routeConfig.article}/${blogHandle}/${handle}`
      } else {
        route = `${routeConfig.article}/blog/${handle}`
      }
      break
    case 'page':
      route = `${routeConfig.page}/${handle}`
      break
    case 'content':
      route = `${routeConfig.content}/${handle}`
      break
    default:
      route = `${routeConfig.content}/${handle}`
  }

  return route
}
