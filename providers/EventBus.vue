<template>
  <div><slot /></div>
</template>

<script>
import {
  computed,
  provide,
  readonly,
  ref,
  watch
} from '@nuxtjs/composition-api'

export default {
  props: {
    maxLength: {
      type: Number,
      default: 15
    }
  },
  setup(props) {
    const eventLog = ref([])
    const eventHandlers = ref([])
    const lastEvent = computed(() => eventLog.value[0])

    /**
     * Registers an event with the Event Bus.
     * @param {Object} config
     * @param {string} config.type Type of event
     * @param {Object} config.payload Data associated with the event
     * @returns {void}
     */
    const addEvent = ({ type, payload }) => {
      const event = { type, payload, timeStamp: Date.now() }

      eventLog.value = [event, ...eventLog.value].slice(0, props.maxLength)
    }

    /**
     * Registers an event handler with the Event Bus.
     * @param {Object} config
     * @param {string} config.type Type of event to be handled
     * @param {function} config.callback Callback function that processes the event object
     * @param {string} [config.name] Name of the callback handler (for labeling/organization purposes only)
     * @returns {void}
     */
    const onEvent = ({ type, callback, name = '' }) => {
      if (typeof type !== 'string' || !type) {
        console.warn(
          "[nacelle] events passed to the EventBus' `onEvent` method must have a `type`."
        )
        return
      }

      if (typeof callback !== 'function') {
        console.warn(
          "[nacelle] events passed to the EventBus' `onEvent` method must have a valid `callback` function."
        )
        return
      }

      eventHandlers.value = [...eventHandlers.value, { type, callback, name }]
    }

    const eventCallbacks = computed(() => {
      // build up a hash table for easy lookups of the
      // ordered callbacks associated with any given event type
      return eventHandlers.value.reduce((table, eventHandler) => {
        const newTable = {}
        const { callback, name } = eventHandler
        const eventTypeCallbacks = table[eventHandler.type]
          ? table[eventHandler.type].callbacks
          : []

        newTable[eventHandler.type] = {
          callbacks: [...eventTypeCallbacks, { callback, name }]
        }

        return { ...table, ...newTable }
      }, {})
    })

    watch(lastEvent, (event) => {
      if (event?.type && eventCallbacks[event.type]) {
        eventCallbacks[event.type].callbacks.forEach((callbackObj) =>
          callbackObj.callback(event)
        )
      }
    })

    provide('events', readonly(eventLog))
    provide('addEvent', addEvent)
    provide('onEvent', onEvent)
  }
}
</script>
