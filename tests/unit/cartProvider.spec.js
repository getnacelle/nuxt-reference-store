import { mount } from '@vue/test-utils'
import CartProvider from '~/providers/CartProvider'

const product = {
  image: {
    source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
  },
  title: 'Gray T-Shirt',
  productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
  handle: 'gray-t-shirt',
  quantity: 1,
  variant: {
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
  }
}

const InjectedComponent = () => {
  return {
    name: 'InjectedComponent',
    inject: [
      'cart',
      'addItem',
      'removeItem',
      'incrementItem',
      'decrementItem',
      'clearCart'
    ],
    template: `<div></div>`
  }
}

const CartProviderContainer = () => ({
  render: (h) => h(CartProvider, {}, [h(InjectedComponent())])
})

describe('Cart Provider', () => {
  it('provides `cart`, `addItem`, `removeItem`, `incrementItem`, `decrementItem`, `clearCart` to children', () => {
    const cartProvider = mount(CartProviderContainer())
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    })

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(typeof injectedComponent.vm.addItem).toEqual('function')
    expect(typeof injectedComponent.vm.removeItem).toEqual('function')
    expect(typeof injectedComponent.vm.incrementItem).toEqual('function')
    expect(typeof injectedComponent.vm.decrementItem).toEqual('function')
    expect(typeof injectedComponent.vm.clearCart).toEqual('function')
  })

  it('adds item to cart with `addItem`', () => {
    const cartProvider = mount(CartProviderContainer())
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    })
    injectedComponent.vm.addItem(product)

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(injectedComponent.vm.cart.value.length).toBe(1)
    expect(injectedComponent.vm.cart.value[0].id).toContain(product.variant.id)
  })

  it('removes item from cart with `removeItem`', () => {
    const cartProvider = mount(CartProviderContainer())
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    })
    injectedComponent.vm.addItem(product)

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(injectedComponent.vm.cart.value.length).toBe(1)

    const cart = injectedComponent.vm.cart.value
    injectedComponent.vm.removeItem(cart[0].id)

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(injectedComponent.vm.cart.value.length).toBe(0)
  })

  it('increases item quantity by 1 with `incrementItem`', () => {
    const cartProvider = mount(CartProviderContainer())
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    })
    injectedComponent.vm.addItem(product)

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(injectedComponent.vm.cart.value.length).toBe(1)
    expect(injectedComponent.vm.cart.value[0].quantity).toBe(1)

    const cart = injectedComponent.vm.cart.value
    injectedComponent.vm.incrementItem(cart[0].id)

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(injectedComponent.vm.cart.value.length).toBe(1)
    expect(injectedComponent.vm.cart.value[0].quantity).toBe(2)
  })

  it('decreases item quantity by 1 or removes item at 0 quantity with `decrementItem`', () => {
    const cartProvider = mount(CartProviderContainer())
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    })
    injectedComponent.vm.addItem({ ...product, quantity: 2 })

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(injectedComponent.vm.cart.value.length).toBe(1)
    expect(injectedComponent.vm.cart.value[0].quantity).toBe(2)

    const cart = injectedComponent.vm.cart.value
    injectedComponent.vm.decrementItem(cart[0].id)

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(injectedComponent.vm.cart.value.length).toBe(1)
    expect(injectedComponent.vm.cart.value[0].quantity).toBe(1)

    injectedComponent.vm.decrementItem(cart[0].id)

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(injectedComponent.vm.cart.value.length).toBe(0)
  })

  it('clears the cart with `clearCart`', () => {
    const cartProvider = mount(CartProviderContainer())
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    })
    injectedComponent.vm.addItem({
      ...product,
      variant: { ...product.variant, id: 12345 }
    })
    injectedComponent.vm.addItem({
      ...product,
      variant: { ...product.variant, id: 67890 }
    })

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(injectedComponent.vm.cart.value.length).toBe(2)

    injectedComponent.vm.clearCart()

    expect(Array.isArray(injectedComponent.vm.cart.value)).toBe(true)
    expect(injectedComponent.vm.cart.value.length).toBe(0)
  })
})
