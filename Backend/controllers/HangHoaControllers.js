const HangHoaModel = require("../models/HangHoaModel");
const HinhHHModel = require("../models/HinhHHModel");
const HangHoaControllers = {
    // Register
    create: async (req, res) => {
        const { TenHH, MoTaHH, Gia, SoLuongHang, GhiChu } = req.body;
        try {
            // Create + Save user
            const HangHoa = await HangHoaModel.create({
                TenHH,
                MoTaHH,
                Gia: parseInt(Gia),
                SoLuongHang: parseInt(SoLuongHang),
                GhiChu
            });
            //kiemtra
            if (HangHoa) {
                res.status(200).json(
                    {
                        message: "Tạo HH thành công"
                    }
                )

            } else {
                res.status(404).json(
                    {
                        message: "Tạo HH thất bại!"
                    }
                )
            }

        } catch (error) {
            res.status(500).json({
                message: "Server erorr",
                error: error.message,
            });
        }
    },

    // Login
    GetInformation: async (req, res) => {
        const { MSHH } = req.params;
        try {
            const ThongtinHH = await HangHoaModel.findOne({
                MSHH
            })
            if (ThongtinHH) {
                const ds = await HinhHHModel.find({ MSHH: MSHH })
                let arr = []
                if(ds) {
                   arr = [...ds]
                }
        
                res.status(200).json({
                    sanPham: ThongtinHH, hinhAnh: arr
                });
            } else {
                res.status(404).json({
                    message: " Hàng Hóa không tồn tại "
                });
            }

        } catch (error) {
            res.status(500).json({
                message: "Server erorr",
                error: error.message,
            });
        }
    },
    GetAll: async (req, res) => {
        try {
            const laydanhsach = await HangHoaModel.find()
            let results = []
            if (laydanhsach) {
                for(let i = 0; i < laydanhsach.length; i++) {
                    let obj = laydanhsach[i]
                    const ds = await HinhHHModel.find({ MSHH: obj['MSHH'] })
                    let arr = []
                    if(ds) {
                       arr = [...ds]
                    }
                    results.push({sanPham: obj, hinhAnh: arr})
                }
                res.status(200).json({
                    danhsach: results
                });
            } else {
                res.status(404).json({
                    message: " Hàng Hóa không tồn tại "
                });
            }

        } catch (error) {
            res.status(500).json({
                message: "Server erorr",
                error: error.message,
            });
        }
    },
    Search: async (req, res) => {
        const { TenHH } = req.params;
        try {
            const laydanhsach = await HangHoaModel.find({ TenHH: { $regex: TenHH, $options: 'i' } })
            let results = []
            if (laydanhsach) {
                for(let i = 0; i < laydanhsach.length; i++) {
                    let obj = laydanhsach[i]
                    const ds = await HinhHHModel.find({ MSHH: obj['MSHH'] })
                    let arr = []
                    if(ds) {
                       arr = [...ds]
                    }
                    results.push({sanPham: obj, hinhAnh: arr})
                }
                res.status(200).json({
                    danhsach: results
                });
            } else {
                res.status(404).json({
                    message: " Hàng Hóa không tồn tại "
                });
            }

        } catch (error) {
            res.status(500).json({
                message: "Server erorr",
                error: error.message,
            });
        }
    },
    UpdateInformation: async (req, res) => {
        const { MSHH } = req.params;
        const { TenHH, MoTaHH, Gia, SoLuongHang, GhiChu } = req.body;
        try {
            const HangHoa = await HangHoaModel.findOneAndUpdate({ 
                MSHH },
                {
                    $set:{
                        Gia: parseInt(Gia),
                        TenHH,
                        MoTaHH,
                        SoLuongHang:parseInt(SoLuongHang),
                        GhiChu
                    }
                }
            )
            // kiem tra tt vua cap nhat
            if (HangHoa) {
                res.status(200).json({
                  message:"Cập nhật thành công"
                });
            } else {
                res.status(404).json({
                    message: " Hàng Hóa không tồn tại "
                });
            }

        } catch (error) {
            res.status(500).json({
                message: "Server erorr",
                error: error.message,
            });
        }
    },
    Deletesanpham: async (req, res) => {
        const { MSHH } = req.params;
        try {
            const HangHoa = await HangHoaModel.findOneAndDelete({ 
                MSHH },
            )
            // kiem tra tt vua cap nhat
            if (HangHoa) {
                res.status(200).json({
                  message:" Xoá Hàng Hóa thành công"
                });
            } else {
                res.status(404).json({
                    message: " Hàng Hóa không tồn tại "
                });
            }

        } catch (error) {
            res.status(500).json({
                message: "Server erorr",
                error: error.message,
            });
        }
    },
    //cap nhat tt nv
    DeleteInformation: async (req, res) => {
        const { MSHH } = req.params
        //kiem tra
        if (!MSHH) {
            res.status(400).json({
                message: "không tồn tại MSHH"
            })

        }
        try {

            // Create + Save user
            const XoaHinhAnh = await HinhHHModel.findOneAndDelete(
                {
                    MaHinh
                }

            );

            //kiemtra
            if (HinhHH) {
                res.status(200).json(

                    {
                        message: "Xóa hình ảnh thành công"
                    }
                )

            } else {
                res.status(404).json(
                    {
                        message: "Xóa hình ảnh thất bại!"
                    }
                )
            }

        } catch (error) {
            res.status(500).json({
                message: "Server erorr",
                error: error.message,
            });
        }

    }

};

module.exports = { HangHoaControllers };
