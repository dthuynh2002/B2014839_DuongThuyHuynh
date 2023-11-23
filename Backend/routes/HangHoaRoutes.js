const { HangHoaControllers } = require("../controllers/HangHoaControllers");


const router = require("express").Router();

router.post("/", HangHoaControllers.create);
router.get("/detail/:MSHH", HangHoaControllers.GetInformation);
router.get("/", HangHoaControllers.GetAll);
router.get("/search/:TenHH", HangHoaControllers.Search);
router.put("/:MSHH", HangHoaControllers.UpdateInformation);
router.delete("/:MSHH", HangHoaControllers.Deletesanpham);
module.exports = router;
