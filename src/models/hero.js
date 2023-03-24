let date = require("./../utils/date");
class Hero {
  constructor(id,title, subtitle, description) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.date = date();
  }
}
module.exports = Hero;
