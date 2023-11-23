const KhachHangModel = require("../models/KhachHangModel");
const bcrypt = require("bcrypt");
const KhachHangControllers = {
    // Register
    register: async (req, res) => {
        const { HoTenKH, Password, DiaChi, SoDienThoai } = req.body;
        try {

            // Hash password
            const hashPass = await bcrypt.hash(Password, 10);

            // Create + Save user
            const KhachHang = await KhachHangModel.create({
                HoTenKH,
                Password: hashPass,
                DiaChi,
                SoDienThoai
            });
            //kiemtra
            if (KhachHang) {
                res.status(200).json(
                    {
                        message: "Đăng ký thành công"
                    }
                )

            } else {
                res.status(200).json(
                    {
                        message: "Đăng ký thất bại!"
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
    login: async (req, res) => {
        const { Password, SoDienThoai } = req.body;
        try {
            // Check user exist
            const KhachHang = await KhachHangModel.findOne({
                SoDienThoai,
            });

            if (KhachHang && (await bcrypt.compare(Password, KhachHang.Password))) {

                res.status(200).json({
                    MSKH: KhachHang.MSKH,
                    HoTenKH: KhachHang.HoTenKH,
                    DiaChi: KhachHang.DiaChi,
                    SoDienThoai: KhachHang.SoDienThoai
                });
            } else {
                res.status(404).json({
                    message: " số điện thoại hoặc mật khẩu không tồn tại"
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
    UpdateInformation: async (req, res) => {
        const { MSKH } = req.params
        const { HoTenKH, DiaChi } = req.body
        //kiem tra
        if (!MSKH) {
            res.status(400).json({
                message: "không tồn tại MSKH"
            })

        }
        try {

            // Create + Save user
            const KhachHang = await KhachHangModel.findOneAndUpdate(
                {
                    MSKH
                }, {
                $set: {
                    HoTenKH,
                    DiaChi
                }
            },
                {
                    new: true
                }
            );
            //kiemtra
            if (KhachHang) {
                res.status(200).json(
                    {
                        MSKH: KhachHang.MSKH,
                        HoTenKH: KhachHang.HoTenKH,
                        DiaChi: KhachHang.DiaChi,
                        SoDienThoai: KhachHang.SoDienThoai
                    }
                )

            } else {
                res.status(200).json(
                    {
                        message: "Cập nhật thất bại!"
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

module.exports = { KhachHangControllers };
