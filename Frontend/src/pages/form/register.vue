<script>
import { ref } from "vue";
import { khachhangApi } from "~/api/khachhangApi";
import router from "~/router";

export default {
  setup() {
    const SoDienThoai = ref('');
    const HoTenKH = ref('');
    const DiaChi = ref('');
    const Password = ref('');
    const passwordSub = ref('');

    const handleRegister = async () => {
      const regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
      const regexSDT = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
      const pass = Password.value.trim()

      if (!regexSDT.test(SoDienThoai.value)) {
        return alert('Vui lòng nhập số điện thoại!')
      }

      if (HoTenKH.value.length < 4) {
        return alert('Vui lòng nhập tên tối thiểu 4 kí tự!')
      }

      if (!regexPass.test(pass)) {
        return alert('Vui lòng nhập mật khẩu chứa số, chữ thường, chữ in và ít nhất 8 kí tự!')
      }

      if (passwordSub.value.trim() !== pass) {
        return alert('Mật khẩu không khớp nhau!')
      }

      try {
        const { message } = await khachhangApi.register({
          HoTenKH: HoTenKH.value,
          Password: Password.value,
          DiaChi: DiaChi.value,
          SoDienThoai: SoDienThoai.value
        })

        alert(message)

        router.push('/login')
      } catch (e) {
        alert('Đăng ký thất bại!')
        console.log(e)
      }
    }

    return {
      SoDienThoai,
      Password,
      HoTenKH,
      DiaChi,
      passwordSub,
      handleRegister
    }
  }
}
</script>

<template>
  <div class="login-box">
    <h2>Đăng Ký</h2>
    <form @submit.prevent="handleRegister">
      <div class="user-box">
        <input type="text" required v-model="SoDienThoai" />
        <label>SĐT</label>
      </div>
      <div class="user-box">
        <input type="text" required v-model="HoTenKH" />
        <label>Họ Tên</label>
      </div>
      <div class="user-box">
        <input type="text" required v-model="DiaChi" />
        <label>Địa Chỉ</label>
      </div>
      <div class="user-box">
        <input type="password" required v-model="Password" />
        <label>Password</label>
      </div>
      <div class="user-box">
        <input type="password" required v-model="passwordSub" />
        <label>Nhập Lại Password</label>
      </div>
      <button type="submit">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Đăng Ký
      </button>
    </form>
    <router-link to="/login" class="go-to">Đăng Nhập <i class="fa-solid fa-right-long"></i></router-link>
  </div>
</template>

<style lang="scss" >
@import url('./index.scss');
</style>
