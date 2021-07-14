import cart from '../store/cart'
import checkout from '../store/checkout'
import menu from '../store/menu'
import modal from '../store/modal'
import events from '../store/events'
import product from '../store/product/productModule'
import user from '../store/user'
import space from '../store/space'
import search from '../store/search'

export default () => {
  return {
    modules: {
      cart,
      checkout,
      menu,
      modal,
      events,
      product,
      user,
      space,
      search
    }
  }
}
