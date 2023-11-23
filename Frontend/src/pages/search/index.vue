<script>
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex"
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

export default {
  setup() {
    const search = ref('')
    const hanghoa = ref([])

    const route = useRoute()
    const store = useStore()

    onMounted(() => {
      search.value = route.params.TenHH

      if (search.value) {
        const TenHH = search.value
        store.dispatch('hanghoa/Search', { TenHH })
        hanghoa.value = computed(() => store.state.hanghoa.timkiemhanghoa)
      }
    })

    const handleAddCart = async (data) => {
      store.commit('cart/setCarts', {
        ...data,
        count: 1
      })
    }

    const searchKey = computed(() => search.value)

    return {
      hanghoa,
      handleAddCart,
      searchKey
    }
  }
}
</script>

<template>
  <div class="row">
    <h1 class="title text-center pt-3">
      KẾT QUẢ TÌM KIẾM ({{ searchKey }})
    </h1>
    <div class="row" v-if="hanghoa.value">
      <div class="col-3 mt-3" v-for="(h, i) in hanghoa.value" :key="h.sanPham._id">
        <div class="product">
          <div class="product-top">
            <img :src="'../src/assets/images/' + h.hinhAnh[0].TenHinh" :alt="h.sanPham.TenHH" class="product-top__img">
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
                @click="handleAddCart({ ...h.sanPham, hinhAnh: h.hinhAnh[0].TenHinh })">ĐẶT HÀNG</button>
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
