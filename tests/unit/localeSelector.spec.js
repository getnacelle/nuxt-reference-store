import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import LocaleSelector from '@/components/nacelle/LocaleSelector'
import storeConfig from '@/tests/storeConfig'

import { defaultLocales } from '../../tests/mocks/defaultObjects'

describe('LocaleSelector.vue', () => {
  let store
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store(storeConfig())

    wrapper = mount(LocaleSelector, {
      localVue,
      store,
      propsData: {
        localeList: defaultLocales.locales
      }
    })
  })

  it('renders a select component', () => {
    expect(wrapper.findAll('select').exists()).toBe(true)
  })

  it('updates user locale', async () => {
    wrapper.findAll('option').at(1).element.selected = true
    await wrapper.find('select').trigger('change')

    expect(store.state.user.locale.locale).toBe(
      wrapper.props('localeList')[1].locale
    )
  })
})
