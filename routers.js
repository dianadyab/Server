var express = require("express");
var router = express.Router();
const { addNewInfo } = require("./controllers/addNewInformation");
const { viewInfo } = require("./controllers/viewInformation");
const { updateInfo } = require("./controllers/updateInformation");
// define the home page route
router.post("/add", addNewInfo);
router.put("/view", viewInfo);
router.put("/update", updateInfo);

module.exports = router;
