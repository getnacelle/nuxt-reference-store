import { mount } from '@vue/test-utils'
import EventBus from '~/providers/EventBus'
import eventTypes from '~/utils/eventTypes'

const sanitizeTemplateObject = (event) =>
  `${JSON.stringify(event)}`.replace(/"/g, `'`)

const eventHandlers = [
  {
    type: eventTypes.pageView,
    callback: (event) =>
      console.info(`viewed page: ${event.payload.handle} at ${event.timestamp}`)
  }
]

const InjectedComponent = (event) => {
  const onClick = event
    ? `() => addEvent(${sanitizeTemplateObject(event)})`
    : `() => {}`

  return {
    name: 'InjectedWithEvents',
    inject: ['events', 'onEvent', 'addEvent'],
    template: `<button @click="${onClick}"></button>`
  }
}

const EventBusContainer = (busOptions = {}, event) => ({
  render: (h) => h(EventBus, busOptions, [h(InjectedComponent(event))])
})

describe('Event Bus', () => {
  it('provides `events`, `onEvent`, and `addEvent` to children', () => {
    const eventBus = mount(EventBusContainer())
    const injectedEventsComponent = eventBus.findComponent({
      name: 'InjectedWithEvents'
    })

    expect(Array.isArray(injectedEventsComponent.vm.events.value)).toBe(true)
    expect(typeof injectedEventsComponent.vm.onEvent).toEqual('function')
    expect(typeof injectedEventsComponent.vm.addEvent).toEqual('function')
  })

  it('registers an event sent with `addEvent`', async () => {
    const pageViewEvent = {
      type: eventTypes.pageView,
      payload: { handle: 'some-page' }
    }
    const eventBus = mount(
      EventBusContainer({ props: eventHandlers }, pageViewEvent)
    )
    const injectedEventsComponent = eventBus.findComponent({
      name: 'InjectedWithEvents'
    })
    const button = injectedEventsComponent.find('button')
    await button.trigger('click')

    expect(Array.isArray(injectedEventsComponent.vm.events.value)).toBe(true)
    expect(injectedEventsComponent.vm.events.value.length).toBe(1)
  })

  it('runs an callback registered with `onEvent` when a corresponding event occurs', async () => {
    const collectionViewEvent = {
      type: eventTypes.collectionView,
      payload: { handle: 'some-collection' }
    }
    const eventBus = mount(
      EventBusContainer({ props: eventHandlers }, collectionViewEvent)
    )
    const injectedEventsComponent = eventBus.findComponent({
      name: 'InjectedWithEvents'
    })
    const button = injectedEventsComponent.find('button')

    // We'll make sure that the callback associated with the event is called...
    const expectedCallback = jest.fn()
    injectedEventsComponent.vm.onEvent({
      type: eventTypes.collectionView,
      callback: expectedCallback
    })

    // We'll also make sure that a callback associated with a different event isn't called...
    const unexpectedCallback = jest.fn()
    injectedEventsComponent.vm.onEvent({
      type: eventTypes.productView,
      callback: unexpectedCallback
    })

    await button.trigger('click')

    expect(Array.isArray(injectedEventsComponent.vm.events.value)).toBe(true)
    expect(injectedEventsComponent.vm.events.value.length).toBe(1)
    expect(expectedCallback).toHaveBeenCalledTimes(1)
    expect(expectedCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        ...collectionViewEvent
      })
    )
    expect(unexpectedCallback).toHaveBeenCalledTimes(0)
  })
})
