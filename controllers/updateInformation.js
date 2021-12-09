const DB = require("../db");
const updateInfo = async (req, res) => {
  let { id, name, address, birthdate, email, phonenumber } = req.body;
  try {
    if (!id) {
      res.send({
        success: false,
        error: "National ID is required",
      });
    } else {
      DB.update([id], { name, address, birthdate, email, phonenumber });
      res.send({ success: true });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

module.exports = { updateInfo };
