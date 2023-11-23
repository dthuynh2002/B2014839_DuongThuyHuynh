const { KhachHangControllers } = require("../controllers/KhachHangControllers");

const router = require("express").Router();

router.post("/dangky", KhachHangControllers.register);
router.post("/dangnhap", KhachHangControllers.login);
router.put("/:MSKH", KhachHangControllers.UpdateInformation);
module.exports = router;
