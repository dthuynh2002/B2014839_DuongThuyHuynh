const mongoose = require("mongoose");


const NhanVienModel = mongoose.Schema(
  {
    MSNV: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      auto: true,
      primaryKey: true
    },
    HoTenNV: {
      type: String,
      require: true,
    },
    Password: {
        type: String,
        require: true,
    },
    ChucVu: {
        type: String,
        require: true,
    },
    DiaChi: {
        type: String,
        require: true,
    },
    SoDienThoai: {
        type: String,
        require: true,
        unique: true,
    },
  },
);
module.exports = mongoose.model("NhanVien", NhanVienModel);
