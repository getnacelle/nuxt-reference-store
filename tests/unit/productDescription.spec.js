import { shallowMount } from '@vue/test-utils'
import ProductDescription from '@/components/nacelle/ProductDescription'

describe('ProductDescription.vue', () => {
  it('renders the product description', () => {
    const wrapper = shallowMount(ProductDescription, {
      propsData: { description: '<p>This is the description</p>' }
    })
    expect(wrapper.find('p').exists()).toBe(true)
  })
})
