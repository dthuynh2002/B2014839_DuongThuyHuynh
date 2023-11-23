<template>
  <h1 class="pb-3 text-center">Quản Lý Sản Phẩm</h1>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-outline-success mb-2" data-bs-toggle="modal" data-bs-target="#addModal">
    <i class="fa-solid fa-plus"></i>
  </button>

  <!-- Modal -->
  <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">Thêm Sản Phẩm</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="addproduct" @submit.prevent="handleAddProduct">
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
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="handleAddProduct">OK</button>
        </div>
      </div>
    </div>
  </div>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên Hàng Hóa</th>
        <th scope="col">Giá</th>
        <th scope="col">Số Lượng Hàng</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody v-if="hanghoa">
      <tr v-for="(h, i) in hanghoa" :key="h.sanPham._id">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ h.sanPham.TenHH }}</td>
        <td>{{ h.sanPham.Gia.toLocaleString('vi-VN') }} VND</td>
        <td>{{ h.sanPham.SoLuongHang }}</td>

        <td>
          <router-link :to="{ name: 'edit', params: { MSHH: `${h.sanPham.MSHH}` } }" class="btn btn-primary me-3">
            <i class="fa-solid fa-pen-to-square"></i>
          </router-link>
          <router-link :to="{ name: 'image', params: { MSHH: `${h.sanPham.MSHH}` } }" class="btn btn-warning me-3">
            <i class="fa-solid fa-image"></i>
          </router-link>
          <button class="btn btn-danger" @click="handleDelete(h.sanPham.MSHH)">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { ref } from "vue";
import { hanghoaApi } from '~/api/hanghoaApi'
import { useStore } from "vuex"
import { computed } from "@vue/reactivity";

export default {
  setup() {
    const name = ref('')
    const mota = ref('')
    const gia = ref('')
    const soluonghang = ref('')
    const ghichu = ref('')

    const store = useStore()

    const handleDelete = async ($id) => {
      const check = confirm("Bạn có muốn xóa sản phẩm này")
      if (check) {
        try {
          const { message } = await hanghoaApi.Deletesanpham($id)
          alert(message)
          await store.dispatch('hanghoa/getAll')
        }
        catch (err) {
          console.log(err)
        }
      }
    }

    const handleAddProduct = async () => {
      try {
        const res = await hanghoaApi.create({
          TenHH: name.value,
          MoTaHH: mota.value,
          Gia: parseInt(gia.value),
          SoLuongHang: parseInt(soluonghang.value),
          GhiChu: ghichu.value
        })

        alert(res.message)
        name.value = ''
        mota.value = ''
        gia.value = ''
        soluonghang.value = ''
        ghichu.value = ''

        await store.dispatch('hanghoa/getAll')
      }
      catch (err) {
        console.log(err)
      }
    }

    store.dispatch('hanghoa/getAll')
    const hanghoa = computed(() => store.state.hanghoa.hanghoa)

    return {
      handleDelete,
      handleAddProduct,
      name,
      mota,
      gia,
      soluonghang,
      ghichu,
      hanghoa
    }
  }
}
</script>
<style lang="scss"></style>