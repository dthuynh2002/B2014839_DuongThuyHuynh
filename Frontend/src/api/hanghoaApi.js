import axiosClient from "../utils/axiosClient";
const getURL = (url) => `/hanghoa/${url}`;
export const hanghoaApi = {
    create: async (data) => await axiosClient.post(getURL(''), data),
    GetInformation: async (MSHH) => await axiosClient.get(getURL(`detail/${MSHH}`)),
    GetAll: async () => await axiosClient.get(getURL(``)),
    Search: async (TenHH) => await axiosClient.get(getURL(`search/${TenHH}`)),
    UpdateInformation: async (MSHH, data) => await axiosClient.put(getURL(`${MSHH}`), data),
    Deletesanpham: async (MSHH) => await axiosClient.delete(getURL(`${MSHH}`)),
};
