const DB = require("../db");
const viewInfo = async (req, res) => {
  let { id } = req.body;
  try {
    if (!id) {
      res.send({
        success: false,
        error: "National ID is required",
      });
    } else {
      let info = DB.get(id);
      if (!info) {
        res.send({
          success: false,
          error: "Your ID is not exist in DB",
        });
      } else {
        res.send({ success: true, info });
      }
    }
  } catch (error) {
    console.log("heere");
    console.log(error);
    res.send({ success: false, error: error.message });
  }
};

module.exports = { viewInfo };
