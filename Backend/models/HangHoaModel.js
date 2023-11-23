const mongoose = require("mongoose");

const HangHoaModel = mongoose.Schema(
    {
        MSHH: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            auto: true,
            primaryKey: true
        },
        TenHH: {
            type: String,
            require: true,
        },
        MoTaHH: {
            type: String,
            require: true,

        },
        Gia: {
            type: Number,
            require: true,

        },
        SoLuongHang: {
            type: Number,
            require: true,

        },
        GhiChu: {
            type: String,
            require: false

        },
    },
);
module.exports = mongoose.model("HangHoa", HangHoaModel);
