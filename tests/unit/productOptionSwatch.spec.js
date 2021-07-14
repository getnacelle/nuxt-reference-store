import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'

import ProductOptionSwatch from '@/components/nacelle/ProductOptionSwatch'
import storeConfig from '@/tests/storeConfig'

const localVue = createLocalVue()
localVue.use(Vuex)

const propsData = {
  value: 'Small',
  handle: 'grab-bag',
  optionName: 'Size',
  swatchStyle: 'tab',
  selectedOptions: [],
  variants: [
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODg3MjA2MTcxNDUzNw==',
      price: '43.0',
      availableForSale: true,
      selectedOptions: [
        {
          name: 'Size',
          value: 'Small'
        },
        {
          name: 'Color',
          value: 'Red'
        }
      ]
    }
  ]
}

describe('ProductOptionSwatch.vue', () => {
  let actions
  let store

  beforeEach(() => {
    const namespace = `product/grab-bag`

    actions = {}
    actions[`${namespace}/setSelected`] = jest.fn()

    store = new Vuex.Store({
      ...storeConfig(),
      actions
    })
  })

  it('renders a swatch', () => {
    const wrapper = shallowMount(ProductOptionSwatch, {
      store,
      localVue,
      propsData
    })
    expect(wrapper.findAll('div').exists()).toBe(true)
    expect(wrapper.find('.option-swatch').classes()).toContain('in-stock')
    expect(wrapper.text()).toBe('Small')
  })

  it('fires setSelected action when a selection is clicked', () => {
    const wrapper = shallowMount(ProductOptionSwatch, {
      store,
      localVue,
      propsData
    })

    wrapper.find('.option-swatch').trigger('click')

    expect(actions['product/grab-bag/setSelected']).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context,
      {
        name: 'Size',
        value: 'Small'
      }
    )
  })
})
