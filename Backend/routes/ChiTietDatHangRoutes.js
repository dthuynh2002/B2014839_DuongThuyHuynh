const { ChiTietDatHangControllers } = require("../controllers/ChiTietDatHangControllers");

const router = require("express").Router();

router.post("/", ChiTietDatHangControllers.create);
router.get("/:MSHH", ChiTietDatHangControllers.GetAll);
router.get("/chitiet/:MSHH", ChiTietDatHangControllers.XemchitietDH);
module.exports = router;
