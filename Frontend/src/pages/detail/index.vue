<template>
    <div class="row py-3" v-if="hanghoa.value">
        <div class="col-4">
            <div class="product-img d-flex justify-content-center align-items-center">
                <img :src="'../src/assets/images/' + hanghoa.value.hinhAnh[0].TenHinh" :alt="hanghoa.value.sanPham.TenHH"
                    alt="">
            </div>
        </div>
        <div class="col-8">
            <div class="product">
                <h2 class="product-title">{{ hanghoa.value.sanPham.TenHH }}</h2>
                <p class="product-info"><span>Giá: </span>{{ hanghoa.value.sanPham.Gia.toLocaleString('vi-VN') }} VND</p>
                <p class="product-info"><span>Số lượng: </span>{{ hanghoa.value.sanPham.SoLuongHang }}</p>
                <p class="product-info">
                    <span>Mô tả: </span>
                    {{ hanghoa.value.sanPham.MoTaHH }}
                </p>
                <p class="product-info">
                    <span>Ghi chú: </span>
                    {{ hanghoa.value.sanPham.GhiChu }}
                </p>
                <div class="product-group mt-3">
                    <input type="hidden" id="total" v-model="totalCount">
                    <span class="reduce" @click="handleReduce()">-</span>
                    <span class="number">{{ totalCount }}</span>
                    <span class="increase" @click="handleIncrease()">+</span>
                </div>
                <button class="btn btn-dark mt-3 px-5" @click="handleAddCart(hanghoa.value)">
                    Thêm vào giỏ <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex"
import router from "~/router";
import { computed } from "@vue/reactivity";

export default {
    setup() {
        const route = useRoute()
        const store = useStore()

        const MSHH = ref('')
        const count = ref(1)
        const hanghoa = ref({})
        const total = ref(1)

        onMounted(() => {
            MSHH.value = route.params.MSHH

            if (MSHH.value) {
                const id = MSHH.value
                store.dispatch('hanghoa/GetInformation', { MSHH: id })
                hanghoa.value = computed(() => store.state.hanghoa.chitiethanghoa)
            }
        })

        const handleReduce = async () => {
            if (total.value > 1) {
                total.value -= 1
            }
        }

        const handleIncrease = async () => {
            total.value += 1
        }

        const handleAddCart = async (data) => {
            store.commit('cart/setCarts', {
                ...data.sanPham,
                hinhAnh: data.hinhAnh[0].TenHinh,
                count: total.value
            })
        }

        const totalCount = computed(() => total.value)

        return {
            MSHH,
            hanghoa,
            count,
            handleIncrease,
            handleReduce,
            totalCount,
            handleAddCart
        }
    }
}
</script>
<style lang="scss">
@import url('./index.scss');
</style>