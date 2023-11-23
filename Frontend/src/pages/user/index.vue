<template>
    <div class="row py-3">
        <div class="col-4">
            <div class="avatar d-flex justify-content-center align-items-center">
                <img src="../../assets/images/avatar.jpg" alt="">
            </div>
        </div>
        <div class="col-8">
            <div class="info">
                <p><span>Họ tên: </span>{{ user.HoTenKH }}</p>
                <p><span>Địa chỉ: </span>{{ user.DiaChi }}</p>
                <p><span>Số Điện Thoại: </span>{{ user.SoDienThoai }}</p>
            </div>
        </div>
        <div class="col-12 pt-3">
            <h4 class="pb-2">Quản Lý Đơn Hàng</h4>
            <table class="table table-striped">
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
                            <button v-if="bill.TrangThaiDH === 1" class="btn btn-primary me-2"
                                @click="updateStatusBill(bill.SoDonDH)">
                                Xác nhận
                            </button>
                            <button v-if="bill.TrangThaiDH !== 2 && bill.TrangThaiDH !== -1" class="btn btn-danger"
                                @click="cancelStatusBill(bill.SoDonDH)">
                                Hủy
                            </button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { dathangApi } from '~/api/dathangApi'
import { useStore } from "vuex"

export default {
    setup() {
        const id = ref('')
        const bill = ref([])
        const store = useStore()

        const getAllBill = async () => {
            try {
                const res = await dathangApi.GetAll(id.value)
                if (res.dathang) {
                    return res.dathang
                }
                return []
            } catch (e) {
                console.log(e)
                return []
            }
        }

        onMounted(async () => {
            id.value = store.state.khachhang.khachhang?.MSKH
            bill.value = await getAllBill()
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
                const { message } = await dathangApi.UpdateInformation(SoDonDH, { TrangThaiDH: 2 })
                alert(message)
                bill.value = await getAllBill();
            } catch (e) {
                console.log(e)
            }
        }

        const cancelStatusBill = async (SoDonDH) => {
            try {
                const { message } = await dathangApi.UpdateInformation(SoDonDH, { TrangThaiDH: -1 })
                alert(message)
                bill.value = await getAllBill();
            } catch (e) {
                console.log(e)
            }
        }

        const billData = computed(() => {
            return bill.value
        })

        const user = store.state.khachhang.khachhang

        return {
            billData,
            getDate,
            getStatusBill,
            updateStatusBill,
            id,
            user,
            cancelStatusBill
        }
    }
}
</script>
<style lang="scss" scoped>
@import url('./index.scss');
</style>