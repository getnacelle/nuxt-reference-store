import NacelleClient from '@nacelle/client-js-sdk/dist/client-js-sdk.esm'

export default function (context, inject) {
  const client = new NacelleClient({
    id: context.$config.nacelleId,
    token: context.$config.nacelleToken,
    nacelleEndpoint: context.$config.nacelleEndpoint,
    wishlistEndpoint: context.$config.wishlistEndpoint,
    recommendationsEndpoint: context.$config.recommendationsEndpoint,
    useStatic: false
  })

  const plugin = {
    client,
    data: client.data,
    checkout: client.checkout,
    events: client.events,
    status: client.status,
    wishlist: client.wishlist,
    recommendations: client.recommendations
  }

  inject('nacelle', plugin)
}
