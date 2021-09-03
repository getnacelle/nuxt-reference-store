<template>
  <div><slot /></div>
</template>

<script>
import { defineComponent, provide, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const events = ref(['testing'])
    provide('events', events)
  }
})
</script>
