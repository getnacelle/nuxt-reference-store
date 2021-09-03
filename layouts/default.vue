<template>
  <div class="app">
    <space-provider :space="space">
      <event-bus>
        <nuxt />
      </event-bus>
    </space-provider>
  </div>
</template>

<script>
import { inject } from '@nuxtjs/composition-api'
import SpaceProvider from '~/providers/SpaceProvider.vue'
import EventBus from '~/providers/EventBus.vue'

export default {
  components: { SpaceProvider, EventBus },
  setup() {
    const space = inject('space')
    return { space }
  }
}
</script>
