import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ProductPrice from '@/components/nacelle/ProductPrice'
import storeConfig from '@/tests/storeConfig'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ProductPrice.vue', () => {
  const store = new Vuex.Store(storeConfig())

  it('sets the price', () => {
    const wrapper = mount(ProductPrice, {
      store,
      localVue,
      propsData: {
        price: '25'
      }
    })
    expect(wrapper.vm.price).toBe('25')
  })
})
