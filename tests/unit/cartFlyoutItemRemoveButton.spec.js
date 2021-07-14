import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import CartFlyoutItemRemoveButton from '@/components/nacelle/CartFlyoutItemRemoveButton'
import storeConfig from '@/tests/storeConfig'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CartFlyoutItemRemoveButton.vue', () => {
  it('removes a line item from the cart', () => {
    const store = new Vuex.Store(storeConfig())
    store.state.cart.lineItems = [
      {
        id:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::ae9703f4-9810-4ac8-bc2b-38f0e57d7028',
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
    const wrapper = shallowMount(CartFlyoutItemRemoveButton, {
      store,
      localVue,
      propsData: {
        lineId: store.state.cart.lineItems[0].id
      }
    })
    const input = wrapper.find('button')
    input.trigger('click')
    expect(store.state.cart.lineItems).toEqual([])
  })
})
