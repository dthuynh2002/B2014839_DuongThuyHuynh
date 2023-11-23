const mongoose = require("mongoose");

const KhachHangModel = mongoose.Schema(
    {
        MSKH: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            auto: true,
            primaryKey: true
        },
        HoTenKH: {
            type: String,
            require: true,
        },
        Password: {
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
module.exports = mongoose.model("KhachHang", KhachHangModel);
