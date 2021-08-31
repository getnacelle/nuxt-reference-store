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
     * @param {number|undefined} config.order The order that this event handler should run, relative to other event handlers operating on the same type of event.
     * - An event with an order of 0 is called first; An even with an order of 1 is called second, etc.
     * - An event without an order will follow events with an order of 0 or greater
     * - An event with an order of -1 will always be called last / after all ordered & unordered events
     * @returns {void}
     */
    const onEvent = ({ type, callback, order }) => {
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

      eventHandlers.value = [...eventHandlers.value, { type, callback, order }]
    }

    const eventCallbacks = computed(() => {
      // build up a hash table for easy lookups of the
      // ordered callbacks associated with any given event type
      return eventHandlers.value.reduce((table, evw) => {
        const newTable = {}
        const { order, callback } = evw

        if (!table[evw.type]) {
          newTable[evw.type] = {
            callbacks: [
              { callback, order: typeof order === 'number' ? order : null }
            ]
          }
        } else {
          newTable[evw.type] = {
            callbacks: [...table[evw.type].callbacks, { callback, order }].sort(
              // Objectives of the sort function:
              // 1. send callbacks with an order of -1 to the end of the callbacks array
              // 2. position unordered callbacks after ordered callbacks with an order of 0 or greater,
              //    and before ordered callbacks with an order of -1
              (a, b) => {
                if (a.order < 0 || a.order > b.order) {
                  return 1
                }

                if (
                  (typeof a.order !== 'number' && b.order < 0) ||
                  a.order < b.order
                ) {
                  return -1
                }

                return 0
              }
            )
          }
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
