<script>
import { ref, onMounted } from "vue";
import { khachhangApi } from "~/api/khachhangApi";
import router from "~/router";
import { useStore } from "vuex"
import { nhanvienApi } from "~/api/nhanvienApi";

export default {
  setup() {
    const SoDienThoai = ref('');
    const Password = ref('');
    const isUser = ref(false)

    const store = useStore()

    onMounted(() => {
      if (window.location.href.indexOf('admin') !== -1) {
        isUser.value = true
      }
    })

    const handleLogin = async () => {
      const regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
      const regexSDT = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
      const pass = Password.value.trim()

      if (!regexSDT.test(SoDienThoai.value)) {
        return alert('Vui lòng nhập số điện thoại!')
      }

      if (!regexPass.test(pass)) {
        return alert('Vui lòng nhập mật khẩu chứa số, chữ thường, chữ in và ít nhất 8 kí tự!')
      }

      try {
        if (!isUser.value) {
          const data = await khachhangApi.login({
            SoDienThoai: SoDienThoai.value.trim(),
            Password: pass
          })
          store.commit('khachhang/setkhachhang', data)
          store.commit('khachhang/setIsLoggIn')
          router.push('/')
        } else {
          const data = await nhanvienApi.login({
            SoDienThoai: SoDienThoai.value.trim(),
            Password: pass
          })
          store.commit('nhanvien/setnhanvien', data)
          store.commit('nhanvien/setIsLoggIn')
          router.push('/admin')
        }
      } catch (e) {
        alert('Đăng nhập thất bại!')
        console.log(e)
      }
    }

    return {
      SoDienThoai,
      Password,
      handleLogin,
      isUser
    }
  }
}
</script>
<template>
  <div class="login-box">
    <h2>Đăng Nhập</h2>
    <form @submit.prevent="handleLogin">
      <div class="user-box">
        <input type="text" required v-model="SoDienThoai" name="SoDienThoai" />
        <label>SĐT</label>
      </div>
      <div class="user-box">
        <input type="password" required v-model="Password" name="Password" />
        <label>Password</label>
      </div>
      <button type="submit">
        Đăng Nhập
      </button>
    </form>
    <router-link to="/register" class="go-to" v-if="!isUser">Đăng Ký <i class="fa-solid fa-right-long"></i></router-link>
  </div>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
