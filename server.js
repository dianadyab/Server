const express = require("express");
const app = express();
//const port = 4000;
const routes = require("./routers");
const bodyParser = require("body-parser");

var cors = require("cors");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api", routes);
/* app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
 */
const hostname = "192.168.1.114";
const port = "4000";
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
