import Vue from 'vue'
import Vuex from 'vuex'
import products from '@/tests/mocks/static-products'
import storeConfig from '@/tests/storeConfig'
Vue.use(Vuex)

const product = products[0]

const { handle, image, metafields, productId, title } = product

const lineItem = {
  variant: product.variants[0],
  handle,
  image,
  title,
  quantity: 1,
  productId,
  metafields
}

const counter = {
  length: 1,
  log: 0
}

const incrementCounter = () => {
  counter.length += 1
  counter.log += 1
}

describe('Event Store', () => {
  const store = new Vuex.Store(storeConfig())

  it('adds a page view event to log array', () => {
    store.dispatch('events/pageView', 'New Page')
    expect(store.state.events.log.length).toEqual(counter.length)
    expect(store.state.events.log[counter.log].eventType).toEqual('PAGE_VIEW')
    expect(store.state.events.log[counter.log].payload).toEqual('New Page')
    incrementCounter()
  })

  it('adds a product view event to log array', async () => {
    await store.dispatch('events/productView', { product })
    expect(store.state.events.log[counter.log].eventType).toEqual(
      'PRODUCT_VIEW'
    )
    expect(store.state.events.log[counter.log].product).toEqual(product)
    incrementCounter()
  })

  it('adds an add-to-cart event to log array', () => {
    store.dispatch('events/addToCart', lineItem)
    expect(store.state.events.log.length).toEqual(counter.length)
    expect(store.state.events.log[counter.log].eventType).toEqual('ADD_TO_CART')
    expect(store.state.events.log[counter.log].payload).toEqual(lineItem)
    incrementCounter()
  })

  it('adds an remove-from-cart event to log array', () => {
    store.dispatch('events/removeFromCart', lineItem)
    expect(store.state.events.log.length).toEqual(counter.length)
    expect(store.state.events.log[counter.log].eventType).toEqual(
      'REMOVE_FROM_CART'
    )
    expect(store.state.events.log[counter.log].payload).toEqual(lineItem)
    incrementCounter()
  })

  it('adds a checkout-init event to log array', () => {
    store.dispatch('events/addToCart', lineItem)
    incrementCounter()

    store.dispatch('events/checkoutInit', { cart: [lineItem] })
    expect(store.state.events.log.length).toEqual(counter.length)
    expect(store.state.events.log[counter.log].eventType).toEqual(
      'CHECKOUT_INIT'
    )
    expect(store.state.events.log[counter.log].payload.cart[0]).toEqual(
      lineItem
    )
    incrementCounter()
  })

  it('adds a search products event to log array', () => {
    const searchQuery = { query: 'fitness' }

    store.dispatch('events/searchProducts', searchQuery)
    expect(store.state.events.log.length).toEqual(counter.length)
    expect(store.state.events.log[counter.log].eventType).toEqual(
      'SEARCH_PRODUCTS'
    )
    expect(store.state.events.log[counter.log].payload).toEqual(searchQuery)
  })
})
