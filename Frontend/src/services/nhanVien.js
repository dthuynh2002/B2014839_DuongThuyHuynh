import axiosClient from "~/utils/axiosClient"

const dangKyNV = async (data) => {
    const { message } = await axiosClient.post('/dangky', data)
    return message
}

const dangNhapNV = async (data) => {
    const { MSNV } = await axiosClient.post('/dangnhap', data)
    return MSNV
}

export {
    dangKyNV,
    dangNhapNV
}