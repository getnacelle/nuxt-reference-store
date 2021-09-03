import NacelleClient from '@nacelle/client-js-sdk'

export default (config) => {
  try {
    const sdk = new NacelleClient({
      id: config?.nacelleId,
      token: config?.nacelleToken,
      nacelleEndpoint: config?.nacelleEndpoint,
      useStatic: false
    })
    return { sdk }
  } catch {
    return { sdk: false }
  }
}
