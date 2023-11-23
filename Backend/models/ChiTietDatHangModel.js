const mongoose = require("mongoose");

const ChiTietDatHangModel = mongoose.Schema(
    {
        SoDonDH: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"DatHang",
            primaryKey: true
        },
        MSHH: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"HangHoa",
            primaryKey: true
        },
        SoLuong: {
            type: Number,
            require: true,

        },
        GiaDatHang: {
            type: Number,
            require: true,

        },
        GiamGia: {
            type: Number,
            require: true,

        },
    },
);
//dinh nghia rang buoc
ChiTietDatHangModel.pre("save",async function (next){
 try{
    const HangHoa = await mongoose.model("HangHoa").findOne({
        MSHH: this.MSHH
    });

    if (!HangHoa){
        throw new Error("Hàng Hóa Không Tồn Tại");
    }

    if (this.SoLuong > HangHoa.SoLuongHang ){
        throw new Error("Số Lượng không vượt quá số lượng hàng");
    }

    next();
 }
 catch (error) {
    next(error);
 }
})
module.exports = mongoose.model("ChiTietDatHang", ChiTietDatHangModel);
