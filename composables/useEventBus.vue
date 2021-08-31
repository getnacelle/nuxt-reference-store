<script>
import { inject } from '@nuxtjs/composition-api'

export default {
  setup() {
    const addEvent = inject('addEvent')
    const onEvent = inject('onEvent')

    return {
      addEvent,
      onEvent
    }
  }
}
</script>
