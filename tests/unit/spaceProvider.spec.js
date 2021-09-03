import { mount } from '@vue/test-utils'
import { linklists, mainMenu } from '../mocks/linklists'
import SpaceProvider from '~/providers/SpaceProvider'

const InjectedComponent = () => {
  return {
    name: 'InjectedWithEvents',
    inject: [
      'id',
      'metafields',
      'linklists',
      'setId',
      'setName',
      'setDomain',
      'addMetafield',
      'getMetafieldsObj',
      'getMetafield',
      'getLocalizedLinks'
    ],
    template: `<div></div>`
  }
}

const SpaceProviderContainer = ({ props }) => ({
  render: (h) => h(SpaceProvider, { props }, [h(InjectedComponent())])
})

describe('Space Provider', () => {
  const space = {
    id: '1234',
    name: 'test-store',
    domain: 'test-store.com',
    metafields: [],
    linklists
  }

  const spaceProvider = mount(SpaceProviderContainer({ props: { space } }))
  const injectedEventsComponent = spaceProvider.findComponent({
    name: 'InjectedWithEvents'
  })

  it('updates id', () => {
    injectedEventsComponent.vm.setId('5678')
    expect(injectedEventsComponent.vm.id.value).toEqual('5678')
  })

  it('adds a metafield to metafields array', () => {
    injectedEventsComponent.vm.addMetafield({
      namespace: 'metatag',
      key: 'og:image',
      value: 'https://demo.getnacelle.com/starship_logo.png'
    })
    expect(injectedEventsComponent.vm.metafields.value).toEqual([
      {
        namespace: 'metatag',
        key: 'og:image',
        value: 'https://demo.getnacelle.com/starship_logo.png'
      }
    ])
  })
  it('gets metafield object', () => {
    injectedEventsComponent.vm.addMetafield({
      namespace: 'metatag',
      key: 'og:image',
      value: 'https://demo.getnacelle.com/starship_logo.png'
    })
    expect(injectedEventsComponent.vm.getMetafieldsObj()).toEqual({
      metatag: { 'og:image': 'https://demo.getnacelle.com/starship_logo.png' }
    })
  })

  it('gets metafield', () => {
    injectedEventsComponent.vm.addMetafield({
      namespace: 'metatag',
      key: 'og:image',
      value: 'https://demo.getnacelle.com/starship_logo.png'
    })
    expect(
      injectedEventsComponent.vm.getMetafield('metatag', 'og:image')
    ).toEqual('https://demo.getnacelle.com/starship_logo.png')
  })

  it('gets menu by handle', () => {
    expect(injectedEventsComponent.vm.getLocalizedLinks('main-menu')).toEqual(
      mainMenu.links
    )
  })
})
