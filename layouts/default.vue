<template>
  <div class="app">
    <event-bus>
      <nuxt />
    </event-bus>
  </div>
</template>

<script>
import EventBus from '~/providers/EventBus.vue'

export default {
  components: { EventBus }
}
</script>
