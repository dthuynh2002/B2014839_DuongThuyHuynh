import { createStore } from "vuex";
import nhanvien from "../modules/nhanvien";
import khachhang from "../modules/khachhang";
import hanghoa from "../modules/hanghoa";
import cart from "../modules/cart";

const store = createStore({
  modules: {
    hanghoa,
    nhanvien,
    khachhang,
    cart
  },
});

export default store;
