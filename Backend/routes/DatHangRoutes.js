const { DatHangControllers } = require("../controllers/DatHangControllers");

const router = require("express").Router();

router.post("/", DatHangControllers.create);
router.get("/khachhang/:MSKH", DatHangControllers.GetAll);
router.get("/nhanvien/:MSNV", DatHangControllers.XemDHNV);
router.put("/:SoDonDH", DatHangControllers.UpdateInformation);
module.exports = router;
