import getRouteDefaults from './getRouteDefaults'
import getDataItemRoute from './getDataItemRoute'
import formatLocale from './formatLocale'

export default ({ type, item, route, routeConfig }) => {
  const defaultTypes = [
    'blog',
    'article',
    'page',
    'content',
    'product',
    'collection'
  ]
  const routePaths = getRouteDefaults(routeConfig)
  const dataItem = {
    type,
    handle: item.handle || '',
    globalHandle: item.globalHandle ? formatLocale(item.globalHandle) : 'en-us',
    payload: item
  }

  if (type === 'article') {
    if (typeof item.blogHandle === 'undefined' || item.blogHandle === '') {
      dataItem.payload.blogHandle = 'blog'
      dataItem.blogHandle = 'blog'
    } else {
      dataItem.payload.blogHandle = item.blogHandle
      dataItem.blogHandle = item.blogHandle
    }
  }

  if (route) {
    dataItem.route = route
  } else {
    dataItem.route = getDataItemRoute(dataItem, routePaths)
  }

  if (item.blogHandle) {
    dataItem.blogHandle = item.blogHandle
  }

  // For custom types append type to global handle
  // This will allow querying based on type with $nacelle.content()
  if (!defaultTypes.includes(dataItem.type)) {
    dataItem.globalHandle = `${dataItem.globalHandle}::${dataItem.type}`
  }

  return dataItem
}
