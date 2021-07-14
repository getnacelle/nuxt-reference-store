import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import ContentHeroBanner from '@/components/nacelle/ContentHeroBanner'
import CtaButton from '@/components/nacelle/CtaButton'
import NacelleImage from '@/components/nacelle/image/NacelleImage'
import Vuex from 'vuex'

import storeConfig from '@/tests/storeConfig'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(storeConfig())

const defaults = {
  imageUrl:
    'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-banner-img.png',
  title: 'Hero Title',
  subtitle: 'Subtitle copy text',
  ctaText: 'CTA BUTTON'
}

const wrapperDefault = shallowMount(ContentHeroBanner, {
  store,
  localVue,
  propsData: { ...defaults },
  components: {
    NacelleImage,
    CtaButton
  }
})

const wrapperFullheight = shallowMount(ContentHeroBanner, {
  store,
  localVue,
  propsData: { ...defaults, size: 'fullheight' },
  components: {
    NacelleImage,
    CtaButton
  }
})

const mockClickHandler = jest.fn()

const wrapperCta = mount(ContentHeroBanner, {
  store,
  localVue,
  propsData: {
    ...defaults,
    ctaHandler: mockClickHandler
  },
  components: {
    NacelleImage,
    CtaButton
  }
})

describe('ContentHeroBanner.vue', () => {
  it('renders a banner', () => {
    expect(wrapperDefault.classes()).toContain('hero')
  })

  it('is size medium by default', () => {
    expect(wrapperDefault.classes()).toContain('is-medium')
  })

  it('is fullheight when supplied "fullheight" size prop', () => {
    expect(wrapperFullheight.classes()).toContain('is-fullheight')
  })

  it('button click triggers custom event', () => {
    const button = wrapperCta.find('button')

    button.trigger('click')

    expect(mockClickHandler).toHaveBeenCalled()
  })
})
