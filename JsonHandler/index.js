const fs = require("fs");

module.exports = class JsonHandler {
  saveJson(data) {
    try {
      const save = JSON.stringify(data);
      fs.writeFileSync("./projects/projects.json", save);
    } catch (e) {
      throw e;
    }
  }
};
