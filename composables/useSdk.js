import NacelleClient from '@nacelle/client-js-sdk/dist/client-js-sdk.esm'

export default (config) => {
  const sdk = new NacelleClient({
    id: config.nacelleId,
    token: config.nacelleToken,
    nacelleEndpoint: config.nacelleEndpoint,
    useStatic: false
  })
  return { sdk }
}
