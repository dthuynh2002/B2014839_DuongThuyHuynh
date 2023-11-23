import { hanghoaApi } from "~/api/hanghoaApi";

// initial state
const state = () => ({
    hanghoa: [],
    timkiemhanghoa: [],
    chitiethanghoa: null,
    error: "",
});

// getters
const getters = {};

// actions
const actions = {
    async getAll({ commit }) {
        try {
            const { danhsach } = await hanghoaApi.GetAll()
            commit("sethanghoa", danhsach);
        }
        catch (err) {
            commit("seterror", err.message);
        }
    },
    async Search({ commit }, { TenHH }) {
        try {
            const { danhsach } = await hanghoaApi.Search(TenHH)

            commit("setimkiemhanghoa", danhsach);
        }
        catch (err) {
            commit("seterror", err.message);
        }
    },
    async GetInformation({ commit }, { MSHH }) {
        try {
            const data = await hanghoaApi.GetInformation(MSHH)
            commit("setchitiethanghoa", data);
        }
        catch (err) {
            commit("seterror", err.message);
        }
    }
};

// mutations
const mutations = {
    sethanghoa(state, payload) {
        state.hanghoa = payload;
    },
    setimkiemhanghoa(state, payload) {
        state.timkiemhanghoa = payload;
    },
    setchitiethanghoa(state, payload) {
        state.chitiethanghoa = payload;
    },
    seterror(state, payload) {
        state.error = payload;
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
