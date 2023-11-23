import axiosClient from "../utils/axiosClient";
const getURL = (url) => `/khachhang/${url}`;
export const khachhangApi = {
  login: async (data) => await axiosClient.post(getURL('dangnhap'), data),
  register: async (data) => await axiosClient.post(getURL('dangky'), data),
  UpdateInformation: async (MSKH, data) => await axiosClient.put(getURL(`${MSKH}`), data),
};
