<template>
  <div class="app">
    <space-provider :space="space">
      <event-provider>
        <nuxt />
      </event-provider>
    </space-provider>
  </div>
</template>

<script>
import { inject } from '@nuxtjs/composition-api'
import SpaceProvider from '~/providers/SpaceProvider'
import EventProvider from '~/providers/EventProvider'

export default {
  components: { SpaceProvider, EventProvider },
  setup() {
    const space = inject('space')
    return { space }
  }
}
</script>
