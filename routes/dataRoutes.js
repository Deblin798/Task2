const express = require("express");
const router = express.Router();
const { addData, updateData, getData, getCount } = require('../controllers/dataController');

router.post("/add", addData);
router.put("/update/:id", updateData);
router.get("/get", getData);
router.get("/count", getCount);

module.exports = router;
