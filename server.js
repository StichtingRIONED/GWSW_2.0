const express = require("express");
const http = require("http");
const fs = require("fs");

const indexFile = __dirname + "/index.html";
const mdFile = __dirname + "/gwsw ontologie 2.0.md";

let date = Date.now();
const srv = express();

/**
 * Reload-test vanuit client: is er een update gedaan
 */
srv.get("/reload", (req, res) => {
  if (chkUpdate())
    res.status(200).send();
  else
    res.status(201).send();
});
srv.get("/", (req, res) => {
  res.sendFile(indexFile);
  //startWait();
});
srv.use("/", express.static("./"));
srv.use("/builds", express.static("./builds"));
srv.use("/assets/", express.static("./assets"));

srv.listen(3000, () => {
  console.log("express listening on port 3000");
});
/**
 * Update nodig? (20230522)
 * @returns 
 */
function chkUpdate() {

  if (fs.existsSync(mdFile)) {
    let stats = fs.statSync(mdFile);
    if (!date || (stats["mtimeMs"] > date)) {
      date = stats["mtimeMs"];
      return true;
    }
  }
  return false;
}
