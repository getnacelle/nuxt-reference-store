import authenticated from '~/middleware/authenticated'
import notAuthenticated from '~/middleware/notAuthenticated'

export default function (ctx) {
  ctx.app.router.onReady(() => {
    switch (ctx.app.router.currentRoute.name) {
      case 'account':
        authenticated(ctx)
        break
      case 'account-login':
        notAuthenticated(ctx)
        break
      default:
      // no action needed on other pages
    }
  })
}
