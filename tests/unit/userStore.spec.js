import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import createStoreConfig from '@/tests/storeConfig'

process.browser = true
describe('User Store', () => {
  it('sets user data ', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const storeConfig = createStoreConfig()
    const store = new Vuex.Store(storeConfig)

    store.commit('user/setUserData', {
      userID: '123456',
      customerEmail: 'test@test.com'
    })
    expect(store.state.user.userID).toEqual('123456')
    expect(store.state.user.customerEmail).toEqual('test@test.com')
  })
})
