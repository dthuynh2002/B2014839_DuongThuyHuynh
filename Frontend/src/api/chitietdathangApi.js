import axiosClient from "../utils/axiosClient";
const getURL = (url) => `/chitietdathang/${url}`;
export const chitietdathangApi = {
    create: async (data) => await axiosClient.post(getURL(''), data),
    GetAll: async (data) => await axiosClient.get(getURL(`${MSHH}`), data),
    XemchitietDH: async (MSHH) => await axiosClient.get(getURL(`chitiet/${MSHH}`) ),
};
