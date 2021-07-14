import { mount } from '@vue/test-utils'
import CartFlyoutHeader from '@/components/nacelle/CartFlyoutHeader'

describe('CartFlyoutHeader.vue', () => {
  it('displays the cart header', () => {
    const wrapper = mount(CartFlyoutHeader, {
      propsData: { title: 'Your Cart' }
    })
    expect(wrapper.find('h3').exists()).toBe(true)
  })
})
