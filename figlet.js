const figlet = require("figlet");
const pjson = require("./package.json");

// FIGfont spec in JavaScript
module.exports = figlet(pjson.name, (err, data) => {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});