import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'
import QuantitySelector from '@/components/nacelle/QuantitySelector'
import { defaultLineItem } from '@/tests/mocks/defaultObjects'
import storeConfig from '@/tests/storeConfig'

Vue.use(Vuex)

describe('QuantitySelector.vue', () => {
  it('if quantity equals 1 decrement removes item, if item specified in props', () => {
    const store = new Vuex.Store(storeConfig())
    store.dispatch('cart/addLineItem', {
      ...defaultLineItem,
      quantity: 1
    })

    const WrapperComp = {
      template: `
      <quantity-selector
        :quantity="item.quantity"
        :item="item"
      />
      `,
      components: {
        QuantitySelector
      },
      data() {
        return {
          item: store.state.cart.lineItems[0]
        }
      }
    }
    const wrapper = mount(WrapperComp, {
      store
    }).findComponent(QuantitySelector)

    wrapper.vm.decrement()

    expect(store.state.cart.lineItems.length).toEqual(0)
  })
})
