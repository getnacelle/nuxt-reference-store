import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ProductAddToCartButton from '@/components/nacelle/ProductAddToCartButton'
import { defaultProduct } from '@/tests/mocks/defaultObjects'
import createStoreConfig from '@/tests/storeConfig'

const storeConfig = createStoreConfig()

const variant = defaultProduct.variants[0]

const productData = {
  product: defaultProduct,
  selectedVariantId: variant.id,
  metafields: [],
  quantity: 1,
  allOptionsSelected: false,
  confirmedSelection: false,
  onlyOneOption: false
}

const localVue = createLocalVue()
localVue.use(Vuex)

const localStoreConfig = storeConfig

let store, spyAddLineItem, wrapperDefault

describe('Product Add to Cart Button', () => {
  beforeEach(() => {
    store = new Vuex.Store(localStoreConfig)
    store.state.product.product = productData.product
    spyAddLineItem = jest.spyOn(
      localStoreConfig.modules.cart.actions,
      'addLineItem'
    )
    wrapperDefault = shallowMount(ProductAddToCartButton, {
      localVue,
      store,
      propsData: {
        product: productData.product,
        variant
      }
    })
  })

  it('renders the button', () => {
    expect(wrapperDefault.findAll('button').exists()).toBe(true)
  })

  it('displays "Add To Cart" button text', () => {
    expect(wrapperDefault.find('button').text()).toBe('Add To Cart')
  })

  it('adds the item to cart', () => {
    wrapperDefault.find('button').trigger('click')

    expect(spyAddLineItem).toHaveBeenCalled()
    expect(store.state.cart.lineItems.length).toBeGreaterThan(0)
  })

  it('passes metafield props recieved from parent to lineItems', () => {
    const wrapperMeta = shallowMount(ProductAddToCartButton, {
      localVue,
      store,
      propsData: {
        metafields: [{ key: 'customProp1', value: 'customValue1' }],
        product: productData.product,
        variant
      }
    })
    wrapperMeta.find('button').trigger('click')

    expect(store.getters['cart/checkoutLineItems'][0].metafields).toEqual([
      { key: 'customProp1', value: 'customValue1' }
    ])
  })
})
