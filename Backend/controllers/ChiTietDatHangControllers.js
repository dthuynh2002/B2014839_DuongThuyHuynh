const ChiTietDatHangModel = require("../models/ChiTietDatHangModel");
const ChiTietDatHangControllers = {

    create: async (req, res) => {
        const { MSHH, SoLuong , GiaDatHang, GiamGia } = req.body;

        try {
            const ChiTietDatHang = await ChiTietDatHangModel.create({
                MSHH,
                SoLuong,
                GiaDatHang,
                GiamGia
            });

            if (ChiTietDatHang) {
                res.status(200).json({
                    message:"tạo chi tiết đặt hàng thành công "
                });
            } else {
                res.status(400).json({
                    message: "Thất bại!",
                });
            }
        } catch (err) {
            res.status(400).json({
                message: "Thêm đơn hàng thất bại!",
                error: err.message,
            });
        }
    },

    GetAll: async (req, res) => {
        const { MSHH } = req.params;
        if (MSHH.length <= 0) {
            res.status(400).json({
                message: "không tồn tại MSHH !",
            });
        }

        try {
            const ChiTietDatHang = await ChiTietDatHangModel.find({
                MSHH,
            });

            if (ChiTietDatHang) {
                res.status(200).json({
                    ChiTietDatHang,
                });
            } else {
                res.status(400).json({ message: "không tìm thấy tất cả MSHH !" });
            }
        } catch (error) {
            res.status(500).json({
                message: "Server erorr",
                error: error.message,
            });
        }
    },
    XemchitietDH: async (req, res) => {
        const { MSHH } = req.params;
        if (MSHH.length <= 0) {
            res.status(400).json({
                message: "Đơn hàng không tồn tại!",
            });
        }
        try {
            const donhang = await ChiTietDatHangModel.find({
                MSHH,
            });

            if (donhang) {
                res.status(200).json({
                    data: donhang,
                });
            } else {
                res.status(400).json({ message: "không tìm thấy thông tin!" });
            }
        } catch (err) {
            res.status(400).json({
                message: "Không tìm thấy sản phẩm!",
                error: err.message,
            });
        }
    },
};

module.exports = { ChiTietDatHangControllers };