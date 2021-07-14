import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MainNavCart from '@/components/nacelle/MainNavCart'
import storeConfig from '@/tests/storeConfig'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('MainNavCart.vue', () => {
  it('displays correct cart quantity', () => {
    const store = new Vuex.Store(storeConfig())
    store.state.cart.lineItems = [
      {
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        quantity: 1,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ]
    const wrapper = shallowMount(MainNavCart, {
      localVue,
      store
    })
    const count = wrapper.find('.cart-count')
    expect(count.text()).toEqual('1')
  })
})
