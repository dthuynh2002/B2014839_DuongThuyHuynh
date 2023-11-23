const HinhHHModel = require("../models/HinhHHModel");
const HinhHHControllers = {
    // Register
    create: async (req, res) => {
        const { TenHinh, MSHH } = req.body;
        try {
            // Create + Save user
            const HinhHH = await HinhHHModel.create({
                TenHinh,
                MSHH
            });
            //kiemtra
            if (HinhHH) {
                res.status(200).json(
                    {
                        message: "Thêm hình ảnh thành công"
                    }
                )

            } else {
                res.status(200).json(
                    {
                        message: "Thêm hình ảnh thất bại!"
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
    GetImage: async (req, res) => {
        const { MSHH } = req.params;
        try {
            // Check user exist
            const danhsachHA = await HinhHHModel.find({
                MSHH
            })
            if (danhsachHA) {

                res.status(200).json({
                    danhsachHA
                });
            } else {
                res.status(404).json({
                    message: " Lấy hình thất bại"
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
        const { MaHinh } = req.params
        //kiem tra
        if (!MaHinh) {
            res.status(400).json({
                message: "không tồn tại MSHH"
            })

        }
        try {

            // Create + Save user
            const HinhHH = await HinhHHModel.findOneAndDelete(
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

module.exports = { HinhHHControllers };
