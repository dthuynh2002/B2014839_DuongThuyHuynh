import axiosClient from "../utils/axiosClient";
const getURL = (url) => `/dathang/${url}`;
export const dathangApi = {
create: async (data) => await axiosClient.post(getURL(''), data),
GetAll: async (MSKH) => await axiosClient.get(getURL(`khachhang/${MSKH}`) ),
XemDHNV: async (MSNV) => await axiosClient.get(getURL(`nhanvien/${MSNV}`) ),
UpdateInformation: async (SoDonDH, data) => await axiosClient.put(getURL(`${SoDonDH}`), data),
};
