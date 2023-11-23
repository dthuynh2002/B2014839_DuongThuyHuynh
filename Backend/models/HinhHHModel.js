const mongoose = require("mongoose");

const HinhHHModel = mongoose.Schema(
    {
        MaHinh: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            auto: true,
            primaryKey: true
        },
        TenHinh: {
            type: String,
            require: true,
        },
        MSHH: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"HangHoa"
        },
    },
);
module.exports = mongoose.model("HinhHH", HinhHHModel);
