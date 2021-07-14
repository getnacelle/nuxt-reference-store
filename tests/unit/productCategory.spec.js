import { shallowMount } from '@vue/test-utils'
import ProductCategory from '@/components/nacelle/ProductCategory'

describe('ProductCategory.vue', () => {
  it('renders the product category', () => {
    const wrapper = shallowMount(ProductCategory, {
      propsData: { category: 'Test' }
    })
    expect(wrapper.find('p').exists()).toBe(true)
  })
})
