import { inject } from '@vue/composition-api'

export default function useEventBus() {
  const linklists = inject('linklists')
  const getLocalizedLinks = inject('getLocalizedLinks')
  const menuVisible = inject('menuVisible')
  const openMenu = inject('openMenu')
  const toggleShowMenu = inject('toggleShowMenu')
  const disableMenu = inject('disableMenu')

  return {
    linklists,
    getLocalizedLinks,
    menuVisible,
    openMenu,
    toggleShowMenu,
    disableMenu
  }
}
