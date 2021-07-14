import { shallowMount } from '@vue/test-utils'
import CtaButton from '@/components/nacelle/CtaButton'

describe('CtaButton.vue', () => {
  it('renders a button by default', () => {
    const wrapper = shallowMount(CtaButton, {
      propsData: { to: '/test' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders a element for external link', () => {
    const wrapper = shallowMount(CtaButton, {
      propsData: { to: 'https://www.google.com' }
    })
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.attributes('href')).toBe('https://www.google.com')
  })
})
