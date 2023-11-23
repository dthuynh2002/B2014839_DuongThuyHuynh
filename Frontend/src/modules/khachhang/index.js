// initial state
const state = () => ({
  khachhang: null,
  isLoggIn: false
});

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  setkhachhang(state, payload) {
    state.khachhang = payload;
  },
  setIsLoggIn(state) {
    state.isLoggIn = true;
  },
  setIsLoggOut(state) {
    state.isLoggIn = false
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
