const DB = require("../db");
const addNewInfo = async (req, res) => {
  let { id, name, address, birthdate, email, phonenumber } = req.body;
  try {
    if (!(id /*  && name && address && birthdate && email && phonenumber */)) {
      res.send({
        success: false,
        error: "All information are required, please fill all fields",
      });
    } else {
      if (DB.get(id)) {
        res.send({
          success: false,
          error: "This Id already exist",
        });
      } else {
        DB.set([id], { name, address, birthdate, email, phonenumber });
        res.send({ success: true });
      }
    }
  } catch (error) {
    console.log("heere");
    console.log(error);
    res.send({ success: false, error: error.message });
  }
  //DB.set("one", { a: 1, b: 1 });
  // DB.set("5555", { name: "diana", address: "dubai" });

  // console.log(DB.get("5555"));
};

module.exports = { addNewInfo };
