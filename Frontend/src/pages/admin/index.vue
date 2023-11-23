<template >
  <h1 class="pb-4 text-center">Quản Lý Đơn Hàng</h1>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">STT</th>
        <th scope="col">MSKH</th>
        <th scope="col">Ngày Đặt Hàng</th>
        <th scope="col">Ngày Giao Hàng</th>
        <th scope="col">Trạng Thái Giao Hàng</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody v-if="billData">
      <tr v-for="(bill, i) in billData" :key="bill._id">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ bill.MSKH }}</td>
        <td>{{ getDate(bill.NgayDH, '-') }}</td>
        <td>{{ getDate(bill.NgayGH, '-') }}</td>
        <td>{{ getStatusBill(bill.TrangThaiDH) }}</td>
        <td>
          <button v-if="bill.TrangThaiDH === 0" class="btn btn-primary" @click="updateStatusBill(bill.SoDonDH)">
            Xác nhận
          </button>
        </td>
      </tr>
    </tbody>

  </table>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { dathangApi } from '~/api/dathangApi'
import { useStore } from "vuex"

export default {
  setup() {
    const bill = ref([])
    const id = ref('')
    const store = useStore()

    const getAllBill = async () => {
      try {
        const res = await dathangApi.XemDHNV(id.value)
        if (res.data) {
          return res.data
        }
        return []
      } catch (e) {
        console.log(e)
        return []
      }
    }

    onMounted(async () => {
      id.value = store.state.nhanvien.nhanvien?.MSNV
      bill.value = await getAllBill();
    });

    const getDate = (date, key) => {
      return (
        new Date(date).getDate() + key
        + (new Date(date).getMonth() + 1) + key
        + new Date(date).getFullYear()
      )
    }

    const getStatusBill = (status) => {
      switch (status) {
        case 1:
          return 'Đang giao'
        case 2:
          return 'Đã giao'
        case -1:
          return 'Hủy'
        default:
          return 'Chờ duyệt'
      }
    }

    const updateStatusBill = async (SoDonDH) => {
      try {
        const { message } = await dathangApi.UpdateInformation(SoDonDH, { TrangThaiDH: 1 })
        alert(message)
        bill.value = await getAllBill();
      } catch (e) {
        console.log(e)
      }
    }

    const billData = computed(() => {
      return bill.value
    })

    return {
      billData,
      getDate,
      getStatusBill,
      updateStatusBill
    }
  }
}
</script>
<style lang="scss"></style>