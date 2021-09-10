import NacelleClient from '@nacelle/client-js-sdk'

export default function useSdk({ config }) {
  let sdk = false
  if (config) {
    sdk = new NacelleClient({
      id: config?.nacelleId,
      token: config?.nacelleToken,
      nacelleEndpoint: config?.nacelleEndpoint,
      useStatic: false
    })
  }
  return { sdk }
}
