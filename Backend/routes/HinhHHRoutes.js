const { HinhHHControllers } = require("../controllers/HinhHHControllers");

const router = require("express").Router();

router.post("/", HinhHHControllers.create);
router.get("/:MSHH", HinhHHControllers.GetImage);
router.delete("/:MaHinh", HinhHHControllers.DeleteInformation);
module.exports = router;
