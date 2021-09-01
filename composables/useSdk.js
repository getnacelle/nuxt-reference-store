import NacelleClient from '@nacelle/client-js-sdk/dist/client-js-sdk.esm'
import { useContext } from '@nuxtjs/composition-api'

export default () => {
  const { $config } = useContext()
  const sdk = new NacelleClient({
    id: $config.nacelleId,
    token: $config.nacelleToken,
    nacelleEndpoint: $config.nacelleEndpoint,
    useStatic: false
  })
  return { sdk }
}
