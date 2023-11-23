import axiosClient from "../utils/axiosClient";
const getURL = (url) => `/hinhanh/${url}`;
export const HinhHHApi = {
    create: async (data) => await axiosClient.post(getURL(''), data),
    GetImage: async (MSHH) => await axiosClient.get(getURL(`${MSHH}`)),
    DeleteInformation: async (MaHinh) => await axiosClient.delete(getURL(`${MaHinh}`)),
};
