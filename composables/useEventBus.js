import { inject } from '@nuxtjs/composition-api'

export default function useEventBus() {
  const addEvent = inject('addEvent')
  const onEvent = inject('onEvent')

  return {
    addEvent,
    onEvent
  }
}
