const { NhanVienControllers } = require("../controllers/NhanVienControllers");

const router = require("express").Router();

router.post("/dangky", NhanVienControllers.register);
router.post("/dangnhap", NhanVienControllers.login);
router.put("/:MSNV", NhanVienControllers.UpdateInformation);
module.exports = router;
