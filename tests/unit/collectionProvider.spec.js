// import { mount } from '@vue/test-utils'
// import CollectionProvider from '~/providers/CollectionProvider'
// import collectionData from '~/utils/collectionData'
// require('dotenv').config()

// const config = {
//   nacelleId: process.env.NACELLE_SPACE_ID,
//   nacelleToken: process.env.NACELLE_GRAPHQL_TOKEN,
//   nacelleEndpoint: process.env.NACELLE_ENDPOINT
// }

// const InjectedComponent = () => {
//   return {
//     name: 'InjectedComponent',
//     inject: [
//       'products',
//       'collections',
//       'setCollections',
//       'addCollections',
//       'fetchCollections',
//       'removeCollections',
//       'clearCollections',
//       'getCollections',
//       'fetchCollectionProducts'
//     ],
//     template: `<div></div>`
//   }
// }

// const WrapperComponent = ({ props = {} } = {}) => ({
//   render: (h) => h(CollectionProvider, { props }, [h(InjectedComponent())])
// })

// describe('Collection Provider', () => {
//   it('provides `products`, `collections`, `setCollections`, `addCollections`, `fetchCollections`, `removeCollections`, `clearCollections`, `getCollections` and `fetchCollectionProducts` to children', () => {
//     const collectionProvider = mount(WrapperComponent())
//     const injectedComponent = collectionProvider.findComponent({
//       name: 'InjectedComponent'
//     })
//     expect(Array.isArray(injectedComponent.vm.products.value)).toBe(true)
//     expect(Array.isArray(injectedComponent.vm.collections.value)).toBe(true)
//     expect(typeof injectedComponent.vm.setCollections).toEqual('function')
//     expect(typeof injectedComponent.vm.addCollections).toEqual('function')
//     expect(typeof injectedComponent.vm.fetchCollections).toEqual('function')
//     expect(typeof injectedComponent.vm.removeCollections).toEqual('function')
//     expect(typeof injectedComponent.vm.clearCollections).toEqual('function')
//     expect(typeof injectedComponent.vm.getCollections).toEqual('function')
//     expect(typeof injectedComponent.vm.fetchCollectionProducts).toEqual(
//       'function'
//     )
//   })

//   it('initializes products & collections from props', () => {
//     const productProvider = mount(
//       WrapperComponent({ props: { collections: collectionData } })
//     )
//     const injectedComponent = productProvider.findComponent({
//       name: 'InjectedComponent'
//     })
//     expect(injectedComponent.vm.products.value.length).toBe(2)
//     expect(injectedComponent.vm.collections.value.length).toBe(2)
//   })

//   it('calls setCollections function to update collections', () => {
//     const collectionProvider = mount(
//       WrapperComponent({ props: { collections: [collectionData[1]] } })
//     )
//     const injectedComponent = collectionProvider.findComponent({
//       name: 'InjectedComponent'
//     })
//     jest.spyOn(injectedComponent.vm, 'setCollections')
//     injectedComponent.vm.setCollections({ collections: collectionData })
//     expect(injectedComponent.vm.setCollections).toHaveBeenCalledTimes(1)
//     expect(injectedComponent.vm.collections.value.length).toBe(2)
//   })

//   it('calls addCollections function to update collections', () => {
//     const collectionProvider = mount(
//       WrapperComponent({ props: { collections: [collectionData[0]] } })
//     )
//     const injectedComponent = collectionProvider.findComponent({
//       name: 'InjectedComponent'
//     })
//     jest.spyOn(injectedComponent.vm, 'addCollections')
//     injectedComponent.vm.addCollections({ collections: [collectionData[1]] })
//     expect(injectedComponent.vm.addCollections).toHaveBeenCalledTimes(1)
//     expect(injectedComponent.vm.collections.value.length).toBe(2)
//   })

//   it('calls addCollections function to update collections w/o duplicates', () => {
//     const collectionProvider = mount(
//       WrapperComponent({ props: { collections: [collectionData[1]] } })
//     )
//     const injectedComponent = collectionProvider.findComponent({
//       name: 'InjectedComponent'
//     })
//     jest.spyOn(injectedComponent.vm, 'addCollections')
//     injectedComponent.vm.addCollections({ collections: [collectionData[1]] })
//     expect(injectedComponent.vm.addCollections).toHaveBeenCalledTimes(1)
//     expect(injectedComponent.vm.collections.value.length).toBe(1)
//   })

//   it('calls fetchCollections function to fetch collections', async () => {
//     const collectionProvider = mount(WrapperComponent({ props: { config } }))
//     const injectedComponent = collectionProvider.findComponent({
//       name: 'InjectedComponent'
//     })
//     /*
//       Not sure best way to mock this one
//     */
//   })

//   it('calls removeCollections function to remove collections', () => {
//     const collectionProvider = mount(
//       WrapperComponent({ props: { collections: collectionData } })
//     )
//     const injectedComponent = collectionProvider.findComponent({
//       name: 'InjectedComponent'
//     })
//     jest.spyOn(injectedComponent.vm, 'removeCollections')
//     injectedComponent.vm.removeCollections({
//       handles: [collectionData[1].handle]
//     })
//     expect(injectedComponent.vm.removeCollections).toHaveBeenCalledTimes(1)
//     expect(injectedComponent.vm.collections.value.length).toBe(1)
//   })

//   it('calls clearCollections function to clear collections', () => {
//     const collectionProvider = mount(
//       WrapperComponent({ props: { collections: collectionData } })
//     )
//     const injectedComponent = collectionProvider.findComponent({
//       name: 'InjectedComponent'
//     })
//     jest.spyOn(injectedComponent.vm, 'clearCollections')
//     injectedComponent.vm.clearCollections()
//     expect(injectedComponent.vm.clearCollections).toHaveBeenCalledTimes(1)
//     expect(injectedComponent.vm.collections.value.length).toBe(0)
//   })

//   it('calls getCollections function to return collection by handle', () => {
//     const collectionProvider = mount(
//       WrapperComponent({ props: { collections: collectionData } })
//     )
//     const injectedComponent = collectionProvider.findComponent({
//       name: 'InjectedComponent'
//     })
//     jest.spyOn(injectedComponent.vm, 'getCollections')
//     const shirts = injectedComponent.vm.getCollections({
//       handles: ['shirts']
//     })
//     const shirtsAndHats = injectedComponent.vm.getCollections({
//       handles: ['shirts', 'hats']
//     })
//     const allProducts = injectedComponent.vm.getCollections({
//       handles: null
//     })
//     expect(shirts.length).toBe(1)
//     expect(shirts[0].handle).toBe('shirts')
//     expect(shirtsAndHats.length).toBe(2)
//     expect(shirtsAndHats[1].handle).toBe('hats')
//     expect(allProducts.length).toBe(2)
//     expect(injectedComponent.vm.getCollections).toHaveBeenCalledTimes(3)
//   })

//   it('calls fetchCollectionProducts function to fetch collection products', async () => {
//     const collectionProvider = mount(WrapperComponent({ props: { config } }))
//     const injectedComponent = collectionProvider.findComponent({
//       name: 'InjectedComponent'
//     })
//     /*
//       Not sure best way to mock this one
//     */
//   })
// })
