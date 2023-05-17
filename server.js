const express = require("express");
const srv = express();

srv.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
srv.use("/", express.static("./"));
srv.use("/builds", express.static("./builds"));
srv.use("/assets/", express.static("./assets"));

srv.listen(3000, () => {
  console.log("express listening on port 3000");
});
