import axiosClient from "../utils/axiosClient";
const getURL = (url) => `/nhanvien/${url}`;
export const nhanvienApi = {
  login: async (data) => await axiosClient.post(getURL('dangnhap'), data),
  register: async (data) => await axiosClient.post(getURL('dangky'), data),
  UpdateInformation: async (MSNV, data) => await axiosClient.put(getURL(`${MSNV}`), data),
};
