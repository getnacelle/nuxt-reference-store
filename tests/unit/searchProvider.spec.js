// import { mount } from '@vue/test-utils'
// import { linklists, mainMenu } from '../mocks/linklists'
// import SpaceProvider from '~/providers/SpaceProvider'

// const InjectedWithSpaceData = () => {
//   return {
//     name: 'InjectedWithSpaceData',
//     inject: [
//       'id',
//       'metafields',
//       'linklists',
//       'getMetafieldsObj',
//       'getMetafield',
//       'getLocalizedLinks'
//     ],
//     template: `<div></div>`
//   }
// }

// const SpaceProviderContainer = ({ props }) => ({
//   render: (h) => h(SpaceProvider, { props }, [h(InjectedWithSpaceData())])
// })

// describe('Space Provider', () => {
//   const space = {
//     id: '1234',
//     name: 'test-store',
//     domain: 'test-store.com',
//     metafields: [
//       {
//         namespace: 'metatag',
//         key: 'og:image',
//         value: 'https://demo.getnacelle.com/starship_logo.png'
//       }
//     ],
//     linklists
//   }

//   const spaceProvider = mount(SpaceProviderContainer({ props: { space } }))
//   const injectedEventsComponent = spaceProvider.findComponent({
//     name: 'InjectedWithEvents'
//   })

//   it('gets metafield object', () => {
//     expect(injectedEventsComponent.vm.getMetafieldsObj()).toEqual({
//       metatag: { 'og:image': 'https://demo.getnacelle.com/starship_logo.png' }
//     })
//   })

//   it('gets metafield', () => {
//     expect(
//       injectedEventsComponent.vm.getMetafield({
//         namespace: 'metatag',
//         key: 'og:image'
//       })
//     ).toEqual('https://demo.getnacelle.com/starship_logo.png')
//   })

//   it('gets menu by handle', () => {
//     expect(injectedEventsComponent.vm.getLocalizedLinks('main-menu')).toEqual(
//       mainMenu.links
//     )
//   })
// })
