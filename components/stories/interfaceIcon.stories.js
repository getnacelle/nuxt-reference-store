import StoryRouter from 'storybook-vue-router'

export default {
  title: 'Components | General / Icon',
  decorators: [StoryRouter()]
}

export const Account = () => ({
  data() {
    return {
      iconName: 'account',
      path: '/account'
    }
  },
  template: '<interface-icon :iconName="iconName" :path="path"/>'
})

Account.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}

export const Cart = () => ({
  data() {
    return {
      iconName: 'cart',
      iconAction: 'cart/showCart'
    }
  },
  template: '<interface-icon :iconName="iconName" :iconAction="iconAction"/>'
})

Cart.story = {
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
