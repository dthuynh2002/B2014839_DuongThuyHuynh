const mongoose = require("mongoose");

const DatHangModel = mongoose.Schema(
    {
        SoDonDH: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            auto: true,
            primaryKey: true
        },
        MSKH: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"DatHang"
        },
        MSNV: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"DatHang"

        },
        NgayDH: {
            type: Date,
            require: true,

        },
        NgayGH: {
            type: Date,
            require: true,

        },
        TrangThaiDH: {
            type: Number,
            require: true,
            values:[-1 , 0 , 1 ,2]

        },
    },
);
//dinh nghia rang buoc
DatHangModel.path("NgayDH").validate(function(value) {
   return value <= this.NgayGH; 
})
module.exports = mongoose.model("DatHang", DatHangModel);
