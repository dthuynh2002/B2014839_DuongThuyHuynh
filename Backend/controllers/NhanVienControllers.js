const NhanVienModel = require("../models/NhanVienModel");
const bcrypt = require("bcrypt");
const NhanVienControllers = {
    // Register
    register: async (req, res) => {
        const { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;
        try {

            // Hash password
            const hashPass = await bcrypt.hash(Password, 10);

            // Create + Save user
            const NhanVien = await NhanVienModel.create({
                HoTenNV,
                Password: hashPass,
                ChucVu,
                DiaChi,
                SoDienThoai
            });
            //kiemtra
            if (NhanVien) {
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
            const NhanVien = await NhanVienModel.findOne({
                SoDienThoai,
            });

            if (NhanVien && (await bcrypt.compare(Password, NhanVien.Password))) {

                res.status(200).json({
                    MSNV: NhanVien.MSNV,
                    HoTenNV: NhanVien.HoTenNV,
                    ChucVu: NhanVien.ChucVu,
                    DiaChi: NhanVien.DiaChi,
                    SoDienThoai: NhanVien.SoDienThoai
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
        const { MSNV } = req.params
        const { HoTenNV, ChucVu, DiaChi } = req.body
        //kiem tra
        if (!MSNV) {
            res.status(400).json({
                message: "không tồn tại MSNV"
            })

        }
        try {

            // Create + Save user
            const NhanVien = await NhanVienModel.findOneAndUpdate(
                {
                    MSNV
                }, {
                $set: {
                    HoTenNV,
                    ChucVu,
                    DiaChi
                }
            },
                {
                    new: true
                }
            );
            //kiemtra
            if (NhanVien) {
                res.status(200).json(
                    {
                        MSNV: NhanVien.MSNV,
                        HoTenNV: NhanVien.HoTenNV,
                        ChucVu: NhanVien.ChucVu,
                        DiaChi: NhanVien.DiaChi,
                        SoDienThoai: NhanVien.SoDienThoai
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

module.exports = { NhanVienControllers };
