import Vue from 'vue'
import Vuex from 'vuex'
import { get, clear } from 'idb-keyval'
import storeConfig from '@/tests/storeConfig'

Vue.use(Vuex)

const checkoutIdA =
  'Z2lkOi8vc2hvcGlmeS9DaGVja291dC85NGZhY2M1Y2U5ZGE3MTQ5NmNiN2MzMmRiNTJkYjE3MT9rZXk9MGNkYzAzZTI4OGNlZjQ5NTY3MDhhNGJjMmQ5YjM1NmI='
const checkoutIdB =
  'Z2lkOi8vc2hvcGlmeS9DaGVja291dC84NjI2YTJmZmY0MWY2NmRiYWQyZGExNzgyZjk3ZmM1MT9rZXk9MDQ1MmNiZmJhZmJmOThhMDRlZDkyOTMyZWQ1NmVkNGE='
const checkoutUrlA =
  'https://test.myshopify.com/21345158252/checkouts/94facc5ce9da71496cb7c32db52db171?key=0cdc03e288cef4956708a4bc2d9b356b&c=undefined&_ga=2.27723004.1986633317.1593731006-1787231262.1590611847'
const checkoutUrlB =
  'https://test.myshopify.com/21347498321/checkouts/8626a2fff41f66dbad2da1782f97fc51?key=0452cbfbafbf98a04ed92932ed56ed4a'

describe('Checkout Store', () => {
  describe('Checkout Mutations', () => {
    it('sets a checkoutId', async () => {
      const store = new Vuex.Store(storeConfig())
      await clear()
      await store.commit('checkout/setId', checkoutIdA)
      const id = await get('checkout-id')
      expect(store.state.checkout.id).toEqual(checkoutIdA)
      expect(id).toEqual(checkoutIdA)
    })

    it('sets a checkoutUrl', async () => {
      const store = new Vuex.Store(storeConfig())
      await clear()
      await store.commit('checkout/setUrl', checkoutUrlA)
      const url = await get('checkout-url')
      expect(store.state.checkout.url).toEqual(checkoutUrlA)
      expect(url).toEqual(checkoutUrlA)
    })

    it('sets a checkout', async () => {
      const store = new Vuex.Store(storeConfig())
      await clear()
      await store.commit('checkout/setCheckout', {
        id: checkoutIdB,
        url: checkoutUrlB
      })
      const url = await get('checkout-url')
      const id = await get('checkout-id')
      expect(store.state.checkout.id).toEqual(checkoutIdB)
      expect(store.state.checkout.url).toEqual(checkoutUrlB)
      expect(id).toEqual(checkoutIdB)
      expect(url).toEqual(checkoutUrlB)
    })
  })

  describe('Checkout Actions', () => {
    it('should NOT initialize checkout if NOT stored locally', async () => {
      const store = new Vuex.Store(storeConfig())
      await clear()
      await store.dispatch('checkout/initializeCheckout')
      expect(store.state.checkout.id).toEqual(null)
      expect(store.state.checkout.url).toEqual(null)
    })

    it('resets current checkout', async () => {
      const store = new Vuex.Store(storeConfig())
      await clear()
      await store.commit('checkout/setCheckout', {
        id: checkoutIdB,
        url: checkoutUrlB
      })
      store.dispatch('checkout/resetCheckout')
      const url = await get('checkout-url')
      const id = await get('checkout-id')
      expect(store.state.checkout.id).toEqual(null)
      expect(store.state.checkout.url).toEqual(null)
      expect(id).toEqual(null)
      expect(url).toEqual(null)
    })
  })
})
