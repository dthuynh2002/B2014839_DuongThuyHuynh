<template >
  <h1 class="pb-3 mb-2">Sửa Sản Phẩm</h1>

  <form @submit.prevent="handleEditProduct">
    <div class="form-group">
      <label for="Name">Tên Hàng Hóa</label>
      <input type="text" class="form-control" id="Name" v-model="name" required>
    </div>
    <div class="form-group">
      <label for="MoTa">Mô Tả Hàng Hóa</label>
      <textarea class="form-control" id="MoTa" rows="3" v-model="mota" required></textarea>
    </div>
    <div class="form-group">
      <label for="Gia">Giá</label>
      <input type="number" class="form-control" id="Gia" v-model="gia" required>
    </div>
    <div class="form-group">
      <label for="SoLuongHang">Số Lượng Hàng</label>
      <input type="number" class="form-control" id="SoLuongHang" v-model="soluonghang" required>
    </div>
    <div class="form-group">
      <label for="Note">Ghi Chú</label>
      <textarea class="form-control" id="Note" rows="3" v-model="ghichu" required></textarea>
    </div>
    <button type="submit" class="btn btn-success mt-3 px-4">OK</button>
  </form>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { hanghoaApi } from '~/api/hanghoaApi'
import { useStore } from "vuex"
import router from "~/router";

export default {
  setup() {
    const name = ref('')
    const mota = ref('')
    const gia = ref('')
    const soluonghang = ref('')
    const ghichu = ref('')
    const MSHH = ref('')
    const route = useRoute()
    const store = useStore()

    onMounted(() => {
      MSHH.value = route.params.MSHH
      if (MSHH.value) {
        const id = MSHH.value
        store.dispatch('hanghoa/GetInformation', { MSHH: id }).then(() => {
          const hanghoa = store.state.hanghoa.chitiethanghoa;
          name.value = hanghoa.sanPham.TenHH
          mota.value = hanghoa.sanPham.MoTaHH
          gia.value = hanghoa.sanPham.Gia
          soluonghang.value = hanghoa.sanPham.SoLuongHang
          ghichu.value = hanghoa.sanPham.GhiChu
        })
      }
    })

    const handleEditProduct = async () => {
      try {
        const res = await hanghoaApi.UpdateInformation(MSHH.value, {
          TenHH: name.value,
          MoTaHH: mota.value,
          Gia: parseInt(gia.value),
          SoLuongHang: parseInt(soluonghang.value),
          GhiChu: ghichu.value
        })

        alert(res.message)
        router.push('/admin/product')
      }
      catch (err) {
        console.log(err)
      }
    }

    return {
      name,
      mota,
      gia,
      soluonghang,
      ghichu,
      handleEditProduct
    }
  }
}

</script>
<style lang="scss"></style>