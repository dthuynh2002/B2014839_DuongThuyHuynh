<template >
    <header class="container ">
        <Logo />
    </header>
    <main class="container">
        <div class="row">
            <div class="col-3">
                <nav class="nav flex-column">
                    <router-link class="nav-link" aria-current="page" to="/admin">QUẢN LÝ ĐƠN HÀNG</router-link>
                    <router-link class="nav-link" to="/admin/product">QUẢN LÝ SẢN PHẨM</router-link>
                    <button class="ptn-logout btn btn-danger" @click="handleLoggOut">
                        Đăng Xuất
                    </button>
                </nav>

            </div>
            <div class="col-9" style="overflow-y: auto; max-height: calc(100vh - 50px);">
                <router-view />
            </div>
        </div>
    </main>
</template>
<script>
import Logo from '../components/Logo.vue';
import { useStore } from "vuex"
import router from "~/router";
export default {
    components: {
        Logo
    },
    setup() {
        const store = useStore()
        const handleLoggOut = async () => {
            const check = confirm("Bạn muốn đăng xuất tài khoản?")
            if (check) {
                store.commit('nhanvien/setIsLoggOut')
                router.push('/login/admin')
            }
        }

        return {
            handleLoggOut
        }
    }
}
</script>
<style lang="scss" scoped>
.nav a {
    color:black;
    text-decoration: none;

    &:hover {
        text-decoration: none;
        color: #fff;
        background-color: #cd5858;
    }
}
</style>