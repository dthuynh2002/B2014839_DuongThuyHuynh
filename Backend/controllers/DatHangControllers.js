const DatHangModel = require("../models/DatHangModel");
const DatHangControllers = {

  create: async (req, res) => {
    const { MSKH, MSNV, NgayDH, NgayGH } = req.body;

    try {
      const dathang = await DatHangModel.create({
        MSKH,
        MSNV,
        NgayDH,
        NgayGH,
        TrangThaiDH: 0,
      });

      if (dathang) {
        res.status(200).json({
          SoDonDH: dathang.SoDonDH,
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
    const { MSKH } = req.params;
    if (MSKH.length <= 0) {
      res.status(400).json({
        message: "sản phẩm không tồn tại!",
      });
    }

    try {
      const dathang = await DatHangModel.find({
        MSKH,
      });

      if (dathang) {
        res.status(200).json({
          dathang,
        });
      } else {
        res.status(400).json({ message: "không tìm thấy tất cả hàng hóa!" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Server erorr",
        error: error.message,
      });
    }
  },
  XemDHNV: async (req, res) => {
    const { MSNV } = req.params;
    if (MSNV.length <= 0) {
      res.status(400).json({
        message: "Đơn hàng không tồn tại!",
      });
    }
    try {
      const donhang = await DatHangModel.find({
        MSNV,
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

  UpdateInformation: async (req, res) => {
    const { SoDonDH } = req.params;
    const { TrangThaiDH } = req.body;

    if (!TrangThaiDH) {
      res.status(400).json({
        message: "tất cả các trường bắt buộc phải có ",
      });
    }

    try {
      const donhang = await DatHangModel.findOneAndUpdate(
        { SoDonDH },
        {
          $set: {
            TrangThaiDH,
          },
        },
        { new: true }
      );

      if (donhang) {
        res.status(200).json({
          SoDonDH: donhang.SoDonDH,
          TrangThaiDH: donhang.TrangThaiDH,
          message: "Cập nhật thành công",
        });
      } else {
        res.status(400).json({
          message: "không tìm thấy đơn hàng ",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "cập nhật thất bại!",
        error: err.message,
      });
    }
  }
};

module.exports = { DatHangControllers };