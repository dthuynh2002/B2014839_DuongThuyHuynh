<script>
import { ref, onMounted, watch, computed } from "vue";
import Logo from './Logo.vue';
import ProductItem from './ProductItem.vue';
import { useStore } from "vuex"
import router from "~/router";

export default {
  setup() {
    const store = useStore()

    const isLoggIn = ref(false)
    const id = ref('')
    const cart = ref()
    const total = ref(0)
    const search = ref('')

    onMounted(() => {
      isLoggIn.value = store.state.khachhang.isLoggIn
      id.value = store.state.khachhang.khachhang?.MSKH
      cart.value = store.state.cart.carts
      if (cart.value && cart.value.length > 0) {
        let sum = 0;
        cart.value.forEach((el) => {
          sum += (el.Gia * el.count)
        })
        total.value = sum
      }
    })

    const totalPrice = computed(() => {
      return total.value ? total.value.toLocaleString('vi-VN') : 0;
    })

    watch(
      () => store.state.cart.carts,
      (newValue, oldValue) => {

        cart.value = newValue
        if (cart.value && cart.value.length > 0) {
          let sum = 0;
          cart.value.forEach((el) => {
            sum += (el.Gia * el.count)
          })
          total.value = sum
        }
      }
    );

    const handleLoggOut = async () => {
      const check = confirm("Bạn muốn đăng xuất tài khoản?")
      if (check) {
        store.commit('khachhang/setIsLoggOut')
        router.push('/login')
      }
    }

    const handlePay = async () => {
      if (cart.value && cart.value.length > 0) {
        if (isLoggIn.value) {
          const MSKH = id.value
          const MSNV = '655ec0b6a781055063bf5a64'
          await store.dispatch('cart/pay', { MSNV, MSKH })
          total.value = 0
        } else {
          router.push('/login')
        }
      } else {
        alert('Giỏ hàng trống!')
      }
    }

    const handleSearch = async () => {
      router.push(`/search/${search.value}`)
    }

    return {
      isLoggIn,
      id,
      handleLoggOut,
      cart,
      total,
      totalPrice,
      handlePay,
      search,
      handleSearch
    }
  },
  components: {
    Logo,
    ProductItem
  }
}
</script>

<template>
  <header>
    <div class="container h-100">
      <div class="header py-2">
        <div class="header-logo">
          <Logo />
          <form class="search" @submit.prevent="handleSearch()">
            <input type="search" placeholder="Nhập tên sản phẩm..." v-model="search">
            <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
        <div class="group-btn">
          <button class="btn-header btn-left" v-if="!isLoggIn">
            <router-link to="/register">Đăng Ký</router-link>
          </button>
          <button class="btn-header" v-if="!isLoggIn">
            <router-link to="/login">Đăng Nhập</router-link>
          </button>
          <router-link :to="{ name: 'user', params: { id } }" class="header-user" v-if="isLoggIn">
            <i class="fa-solid fa-user"></i>
          </router-link>
          <button class="btn-header" v-if="isLoggIn" @click="handleLoggOut">Đăng Xuất</button>
          <div class="cart" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      </div>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">Giỏ Hàng</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ProductItem v-if="cart" v-for="(product, i) in cart" :product="product" :key="product._id" />
        </div>
        <div class="offcanvas-footer">
          <p class="price-total">{{ totalPrice }} VND</p>
          <button class="btn btn-dark" @click="handlePay">Thanh Toán</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/header.scss');
</style>
