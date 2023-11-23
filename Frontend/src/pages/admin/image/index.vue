<template >
  <h1 class="pb-3">Quản Lý Hình ảnh</h1>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-outline-success mb-2" data-bs-toggle="modal" data-bs-target="#addModal">
    <i class="fa-solid fa-plus"></i>
  </button>

  <!-- Modal -->
  <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">Thêm Hình ảnh</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddHH">
            <div class="form-group">
              <label for="Name">Tên Hình ảnh</label>
              <input type="text" class="form-control" id="Name" v-model="TenHinh" placeholder="ex: test.jpg">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="handleAddHH">OK</button>
        </div>
      </div>
    </div>
  </div>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên Hình ảnh</th>
      </tr>
    </thead>
    <tbody v-if="dsHA">
      <tr v-for="(h, i) in dsHA" :key="h._id">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ h.TenHinh }}</td>
        <td>
          <button class="btn btn-danger" @click="handleDelete(h.MaHinh)">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { HinhHHApi } from '~/api/HinhHHApi'
import { useStore } from "vuex"
import { computed } from "@vue/reactivity";

export default {
  setup() {
    const store = useStore()
    const TenHinh = ref('')
    const MSHH = ref('')
    const route = useRoute()
    const dsHA = ref('')

    const handleLoadData = async () => {
      await store.dispatch('hanghoa/GetInformation', { MSHH: MSHH.value })
      const res = computed(() => store.state.hanghoa.chitiethanghoa)
      dsHA.value = res.value.hinhAnh
    }

    onMounted(async () => {
      MSHH.value = route.params.MSHH
      if (MSHH.value) {
        handleLoadData()
      }
    })
    const handleDelete = async ($id) => {
      const check = confirm("Bạn có muốn xóa hình ảnh này")
      if (check) {
        try {
          const { message } = await HinhHHApi.DeleteInformation($id)
          alert(message)
          handleLoadData()
        }
        catch (err) {
          console.log(err)
        }
      }
    }

    const handleAddHH = async () => {
      try {
        const res = await HinhHHApi.create({
          TenHinh: TenHinh.value,
          MSHH: MSHH.value
        })

        alert(res.message)
        TenHinh.value = ''
        handleLoadData()
      }
      catch (err) {
        console.log(err)
      }
    }

    return {
      handleDelete,
      MSHH,
      TenHinh,
      handleAddHH,
      dsHA
    }
  }
}
</script>
<style lang="scss"></style>