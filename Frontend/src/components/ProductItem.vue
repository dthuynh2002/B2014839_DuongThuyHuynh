<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex"
import { computed } from "@vue/reactivity";

export default {
    props: ['product'],
    setup(props) {
        const total = ref(1)
        const store = useStore()

        onMounted(() => {
            total.value = props.product.count
        })

        const handleReduce = async (data) => {
            if (total.value > 1) {
                total.value -= 1
            }

            store.commit('cart/setCarts', {
                ...data,
                count: total.value
            })
        }

        const handleIncrease = async (data) => {
            total.value += 1
            store.commit('cart/setCarts', {
                ...data,
                count: total.value
            })
        }

        const totalCount = computed(() => total.value)

        return {
            handleIncrease,
            handleReduce,
            totalCount
        }
    }
}
</script>

<template>
    <div class="product-item">
        <img :src="'src/assets/images/' + product.hinhAnh" alt="" class="product-item__img">
        <div class="product-item__info">
            <h4>{{ product.TenHH }}</h4>
            <p>{{ product.Gia.toLocaleString('vi-VN') }} VND</p>
            <div class="count">
                <input type="hidden" id="total" v-model="totalCount">
                <span class="reduce" @click="handleReduce(product)">-</span>
                <span class="number">{{ totalCount }}</span>
                <span class="increase" @click="handleIncrease(product)">+</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/productItem.scss');
</style>
