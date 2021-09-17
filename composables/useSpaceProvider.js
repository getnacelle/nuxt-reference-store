import { inject } from '@vue/composition-api'

export default function useSpaceProvider() {
  const id = inject('id')
  const name = inject('name')
  const domain = inject('domain')
  const metafields = inject('metafields')
  const linklists = inject('linklists')
  const nacelleSdk = inject('nacelleSdk')
  const getLocalizedLinks = inject('getLocalizedLinks')
  const getMetatag = inject('getMetatag')
  const getMetafieldsObj = inject('getMetafieldsObj')
  const getMetafieldsByNamespace = inject('getMetafieldsByNamespace')
  const getMetafield = inject('getMetafield')

  return {
    id,
    name,
    domain,
    metafields,
    linklists,
    nacelleSdk,
    getLocalizedLinks,
    getMetatag,
    getMetafieldsObj,
    getMetafieldsByNamespace,
    getMetafield
  }
}
