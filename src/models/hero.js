let date = require("./../utils/date");
class Hero {
  constructor(title, subtitle, description) {
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.date = date();
  }
}
module.exports = Hero;
