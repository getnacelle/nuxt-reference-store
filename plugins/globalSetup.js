import {
  onGlobalSetup,
  useContext,
  provide,
  useAsync
} from '@nuxtjs/composition-api'
import useSdk from '~/composables/useSdk'

export default () => {
  onGlobalSetup(() => {
    const { $config } = useContext()
    const { sdk } = useSdk($config)
    const space = useAsync(() => sdk.data.space())

    provide('space', space)
  })
}
