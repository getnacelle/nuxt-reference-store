<template>
  <div></div>
</template>

<script>
import { useRoute } from '@nuxtjs/composition-api'
import eventTypes from '~/utils/eventTypes'
import useEvents from '~/composables/useEventBus'

export default {
  setup() {
    const { addEvent } = useEvents()
    const route = useRoute()

    addEvent({
      type: eventTypes.pageView,
      payload: { handle: route.value.name }
    })
  }
}
</script>

<style></style>
