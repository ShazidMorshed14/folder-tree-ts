const express = require("express");
const router = express.Router();

//importing the controllers
const { getData, addNewData, updateData } = require("../controllers/data");

router.route("/").get(getData);
router.route("/add").post(addNewData);
router.route("/update").put(updateData);

module.exports = router;
