import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { defaultProduct } from '@/tests/mocks/defaultObjects'
import ProductShopLook from '~/components/nacelle/ProductShopLook'

const localVue = createLocalVue()

describe('ProductShopLook.vue', () => {
  it('click image opens modal', () => {
    const wrapper = shallowMount(ProductShopLook, {
      localVue,
      stubs: { RouterLink: RouterLinkStub },
      propsData: {
        imageSrc:
          'https://nacelle-assets.s3-us-west-2.amazonaws.com/article-featured-media.jpeg',
        products: [defaultProduct]
      }
    })

    const button = wrapper.find('.button')
    button.trigger('click')

    setTimeout(() => {
      expect(wrapper.find('.shop-look-modal').exists()).toBe(true)
    }, 200)
  })
})
