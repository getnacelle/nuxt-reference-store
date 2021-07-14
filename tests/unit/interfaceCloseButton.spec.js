import { shallowMount } from '@vue/test-utils'
import InterfaceCloseButton from '@/components/nacelle/InterfaceCloseButton'

describe('InterfaceCloseButton.vue', () => {
  it('emits a close event on click', () => {
    const wrapper = shallowMount(InterfaceCloseButton)
    wrapper.vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
