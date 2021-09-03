import { inject } from '@vue/composition-api'

export default function useSpaceProvider() {
  const id = inject('id')
  const name = inject('name')
  const domain = inject('domain')
  const metafields = inject('metafields')
  const linklists = inject('linklists')
  const setId = inject('setId')
  const setName = inject('setName')
  const setDomain = inject('setDomain')
  const setMetafields = inject('setMetafields')
  const addMetafield = inject('addMetafield')
  const setLinklists = inject('setLinklists')
  const addLinklist = inject('addLinklist')
  const getLocalizedLinks = inject('getLocalizedLinks')
  const getMetatag = inject('getMetatag')
  const getMetafieldsObj = inject('getMetafieldsObj')
  const getMetaNamespace = inject('getMetaNamespace')
  const getMetafield = inject('getMetafield')

  return {
    id,
    name,
    domain,
    metafields,
    linklists,
    setId,
    setName,
    setDomain,
    setMetafields,
    addMetafield,
    setLinklists,
    addLinklist,
    getLocalizedLinks,
    getMetatag,
    getMetafieldsObj,
    getMetaNamespace,
    getMetafield
  }
}
