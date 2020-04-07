const express = require("express");
const dataController = require("./../Controllers/dataController");
const statsController = require("./../Controllers/statsController");

const router = express.Router();

router.get("/getData", dataController.getData);
router.get("/getDataCount", dataController.getDataCount);
router.get("/getData/:id", dataController.getSpecificData);
router.post("/addData", dataController.addData);
router.patch("/updateuser/:id", dataController.updateUser);
router.get("/getstat", statsController.getStats);
router.patch("/updatestat", statsController.updateStat);

module.exports = router;
