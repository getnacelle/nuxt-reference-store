import NacelleClient from '@nacelle/client-js-sdk'

export default function useSdk({ config }) {
<<<<<<< HEAD
  const sdk = new NacelleClient({
=======
  return new NacelleClient({
>>>>>>> 3717ac2c0e60caf5a31b4417954a7aa09bc56215
    id: config?.nacelleId,
    token: config?.nacelleToken,
    nacelleEndpoint: config?.nacelleEndpoint,
    useStatic: false
  })
}
