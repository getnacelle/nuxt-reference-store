import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default (context) => {
  if (!context.store) {
    context.store = new Vuex.Store()
  }

  context.app.router.afterEach((to, from) => {
    if (process.client) {
      if (to.path === '/search' && from.path === '/search') {
        // don't track page view events for search page filtering
        return
      }

      setTimeout(() => {
        // Check if we have set up the user and if not init
        if (
          context.store.state.user &&
          context.store.state.user.anonymousID === null
        ) {
          context.store.dispatch('user/initUserData')
        }

        // Wait until user is set then dispatch page view event
        const userSetInterval = setInterval(() => {
          if (
            context.store.state.user &&
            context.store.state.user.anonymousID !== null
          ) {
            context.store.dispatch('events/pageView', {
              url: location.href,
              path: to.fullPath,
              routeName: to.name,
              params: to.params
            })

            clearInterval(userSetInterval)
          }
        }, 100)
      }, 0)
    }
  })

  // Send all events to the Nacelle event logger
  context.store.subscribe((mutation) => {
    const { type, payload } = mutation

    if (type.includes('events/')) {
      context.app.$nacelle.events.log(payload)
    }

    if (type === 'user/setLocale') {
      context.app.$nacelle.locale = payload.locale
    }
  })
}
