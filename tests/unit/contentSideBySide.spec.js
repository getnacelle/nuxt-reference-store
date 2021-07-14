import { shallowMount } from '@vue/test-utils'
import ContentSideBySide from '@/components/nacelle/ContentSideBySide'

const defaults = {
  imageUrl: 'https://placehold.it/800x800',
  title: 'Hero Title',
  contentHtml: 'Subtitle copy text',
  ctaText: 'CTA BUTTON'
}

describe('ContentSideBySide.vue', () => {
  it('renders a side by side section', () => {
    const wrapper = shallowMount(ContentSideBySide, {
      propsData: { ...defaults }
    })
    expect(wrapper.classes()).toContain('sbs')
  })
})
