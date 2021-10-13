export default (globalHandle) => {
  const [handle, globalHandleLocale] = globalHandle.split('::')
  const locale = globalHandleLocale || 'en-us'
  const formattedLocale = `::${locale.toLowerCase().replace('_', '-')}`

  return String(`${handle}${formattedLocale}`)
}
