import { chitietdathangApi } from "~/api/chitietdathangApi";
import { dathangApi } from "~/api/dathangApi";

// initial state
const state = () => ({
  carts: []
});

// getters
const getters = {
};

// actions
const actions = {
  async pay({ state, commit }, { MSNV, MSKH }) {
    if (state.carts && state.carts.length > 0) {
      const currentDate = new Date();

      // Lấy ngày hiện tại
      const currentDay = currentDate.getDate();

      // Thêm 7 ngày
      const sevenDaysLater = new Date(currentDate.getTime()); // Tạo một bản sao của currentDate

      sevenDaysLater.setDate(currentDay + 7);
      try {
        const res = await dathangApi.create({
          MSKH,
          MSNV,
          NgayDH: currentDate,
          NgayGH: sevenDaysLater,
        })

        if (res.SoDonDH) {
          const promises = state.carts.map(async (val) => {
            try {
              await chitietdathangApi.create({
                MSHH: val.MSHH,
                SoLuong: val.count,
                GiaDatHang: val.Gia,
                GiamGia: 0
              });
            } catch (error) {
              // Xử lý lỗi ở đây nếu cần thiết
              console.log(`Lỗi khi tạo chi tiết đơn hàng: ${error}`);
            }
          });

          await Promise.all(promises);
          commit('resetCarts');
        }
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
};

// mutations
const mutations = {
  setCarts(state, payload) {
    const check = state.carts.find((val) => val._id === payload._id)
    if (!check) {
      state.carts = [...state.carts, payload];
    } else {
      const carts = state.carts.filter((val) => val._id !== payload._id)
      state.carts = [...carts, payload];
    }
  },
  resetCarts(state) {
    state.carts = []
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
