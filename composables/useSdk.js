import NacelleClient from '@nacelle/client-js-sdk/dist/client-js-sdk.esm'

export default (config) => {
  const sdk = new NacelleClient({
    id: config.nacelleId || process.env.NACELLE_SPACE_ID,
    token: config.nacelleToken || process.env.NACELLE_GRAPHQL_TOKEN,
    nacelleEndpoint: config.nacelleEndpoint || process.env.NACELLE_ENDPOINT,
    useStatic: false
  })
  return { sdk }
}
