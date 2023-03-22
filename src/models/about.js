let date = require("./../utils/date");
class About {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isDelete = false;
    this.date = date();
  }
}
module.exports = About;
