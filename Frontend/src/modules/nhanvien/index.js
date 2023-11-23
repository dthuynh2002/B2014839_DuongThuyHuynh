// initial state
const state = () => ({
  nhanvien: null,
  isLoggIn: false
});

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  setnhanvien(state, payload) {
    state.nhanvien = payload;
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
