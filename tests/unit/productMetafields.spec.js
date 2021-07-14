import { mount } from '@vue/test-utils'
import productMetafields from '../../mixins/productMetafields'

const MixinTestBench = {
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  template: '<div></div>'
}

describe('productMetafields.js', () => {
  const metafields = [
    {
      id: null,
      namespace: 'subscriptions',
      key: 'charge_interval_frequency',
      value: '30',
      __typename: 'ProductMetafield'
    },
    {
      id: null,
      namespace: 'subscriptions',
      key: 'order_interval_frequency',
      value: '30',
      __typename: 'ProductMetafield'
    },
    {
      id: null,
      namespace: 'subscriptions',
      key: 'order_interval_unit',
      value: 'day',
      __typename: 'ProductMetafield'
    }
  ]

  it('creates metafieldObj computed property', () => {
    const wrapper = mount(MixinTestBench, {
      mixins: [productMetafields],
      propsData: {
        product: {
          metafields
        }
      }
    })

    expect(wrapper.vm.metafieldsObj).toEqual({
      subscriptions: {
        order_interval_unit: 'day',
        order_interval_frequency: '30',
        charge_interval_frequency: '30'
      }
    })
  })

  it('gets the metafield value', () => {
    const wrapper = mount(MixinTestBench, {
      mixins: [productMetafields],
      propsData: {
        product: {
          metafields
        }
      }
    })

    const orderIntervalUnit = wrapper.vm.getMetafield(
      'subscriptions',
      'order_interval_unit'
    )

    expect(orderIntervalUnit).toEqual('day')
  })
})
