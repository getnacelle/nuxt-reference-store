import cart from '../store/cart'
import checkout from '../store/checkout'
import modal from '../store/modal'
import events from '../store/events'
import product from '../store/product/productModule'
import user from '../store/user'
import space from '../store/space'
import search from '../store/search'
import wishlist from '../store/wishlist'

export default () => {
  return {
    modules: {
      cart,
      checkout,
      modal,
      events,
      product,
      user,
      space,
      search,
      wishlist
    }
  }
}
