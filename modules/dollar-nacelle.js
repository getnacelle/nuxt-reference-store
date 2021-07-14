import NacelleClient from '@nacelle/client-js-sdk/dist/client-js-sdk.esm'

export default function (context, inject) {
  const client = new NacelleClient({
    id: context.$config.nacelleId,
    token: context.$config.nacelleToken,
    nacelleEndpoint: context.$config.nacelleEndpoint,
    useStatic: false
  })

  const setSpace = async () => {
    const { commit } = context.store
    const space = await client.data.space()
    if (space) {
      const { id, name, domain, metafields, linklists } = space
      commit('space/setId', id)
      commit('space/setName', name)
      commit('space/setDomain', domain)
      commit('space/setMetafields', metafields)
      commit('space/setLinklists', linklists)
    }
  }

  const nacelleNuxtServerInit = async () => {
    await setSpace()
  }

  const plugin = {
    nacelleNuxtServerInit,
    setSpace,
    client,
    data: client.data,
    checkout: client.checkout,
    events: client.events,
    status: client.status
  }

  inject('nacelle', plugin)
}
