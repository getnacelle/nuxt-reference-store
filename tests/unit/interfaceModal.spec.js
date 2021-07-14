import { mount } from '@vue/test-utils'
import InterfaceModal from '@/components/nacelle/InterfaceModal'

describe('InterfaceModal.vue', () => {
  it('renders a modal', () => {
    const wrapper = mount(InterfaceModal, { propsData: { modalOpen: true } })
    expect(wrapper.find('.modal-outer').element).toBeVisible()
  })
})
