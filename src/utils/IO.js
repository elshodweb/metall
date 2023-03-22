let { resolve } = require("path");
let { readFile, writeFile } = require("fs/promises");
class IO {
  constructor(href) {
    this.href = resolve("database", href + ".json");
  }

  async read() {
    let data = await readFile(this.href);
    return data.length ? JSON.parse(data) : [];
  }

  write(data) {
    return writeFile(this.href, data ? JSON.stringify(data, null, 2) : []);
  }
}
module.exports = IO;
