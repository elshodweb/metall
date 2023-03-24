let date = require("./../utils/date");
class About {
  constructor(title, description) {
    this.title = title.trim();
    this.description = description.trim();
    this.date = date();
  }
}
module.exports = About;
