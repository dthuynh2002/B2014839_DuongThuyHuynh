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
    <div class="slide-show">
      <div id="carouselExampleInterval" class="carousel carousel-dark slide h-100" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner h-100">
          <div class="carousel-item active h-100" data-bs-interval="3000">
            <img src="../../assets/images/slide1.png" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item h-100" data-bs-interval="3000">
            <img src="../../assets/images/slide2.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item h-100" data-bs-interval="3000">
            <img src="../../assets/images/slide3.jpg" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <h1 class="title text-center pt-3">
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
