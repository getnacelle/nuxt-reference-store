export const state = () => ({
  modalOpen: false,
  modalContext: null,
  modalData: null
})

export const mutations = {
  openModal(state) {
    state.modalOpen = true
  },

  closeModal(state) {
    state.modalOpen = false
  },

  setModalContext(state, payload) {
    state.modalContext = payload
  },

  setModalData(state, payload) {
    state.modalData = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
