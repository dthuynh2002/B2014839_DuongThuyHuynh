<script>
import { useStore } from "vuex"
import { computed } from "@vue/reactivity";

export default {
  setup() {
    const store = useStore()

    store.dispatch('hanghoa/getAll')
    const hanghoa = computed(() => store.state.hanghoa.hanghoa)

    const handleAddCart = async (data) => {
      store.commit('cart/setCarts', {
        ...data,
        count: 1
      })
    }

    return {
      hanghoa,
      handleAddCart
    }
  }
}
</script>

<template>
  <div class="row">
    <h1 class="title text-center">
      Tất cả sản phẩm
    </h1>
    <div class="row" v-if="hanghoa">
      <div class="col-3 mt-3" v-for="(h, i) in hanghoa" :key="h.sanPham._id">
        <div class="product">
          <div class="product-top">
            <img :src="'src/assets/images/' + h.hinhAnh[0]?.TenHinh" :alt="h.sanPham.TenHH" class="product-top__img">
            <router-link :to="{ name: 'detail', params: { MSHH: `${h.sanPham.MSHH}` } }"></router-link>
          </div>
          <div class="product-info">
            <h4 class="product-info__title">
              <router-link :to="{ name: 'detail', params: { MSHH: `${h.sanPham.MSHH}` } }">
                {{ h.sanPham.TenHH }}
              </router-link>
            </h4>
            <div class="product-info__price">
              {{ h.sanPham.Gia.toLocaleString('vi-VN') }} VND
            </div>
            <div class="d-flex justify-content-center mt-3">
              <button type="button" class="product-info__add"
                @click="handleAddCart({ ...h.sanPham, hinhAnh: h.hinhAnh[0].TenHinh })">Đặt hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
