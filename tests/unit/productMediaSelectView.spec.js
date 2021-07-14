import { mount } from '@vue/test-utils'
import ProductMediaSelectView from '@/components/nacelle/ProductMediaSelectView'

describe('ProductMediaSelectView.vue', () => {
  it('sets a media item as the selected item', () => {
    const wrapper = mount(ProductMediaSelectView, {
      propsData: {
        media: [
          { src: 'test', type: 'image', id: 1 },
          { src: 'test2', type: 'image', id: 2 }
        ],
        featuredMedia: { src: 'test', type: 'image', id: 1 }
      }
    })
    const input = wrapper.find('.media-item')
    input.trigger('click')
    expect(wrapper.vm.selectedMedia).toEqual({
      src: 'test',
      type: 'image',
      id: 1
    })
  })
})
