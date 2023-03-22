let date = require("../utils/date");
class Cards {
  constructor(id, name, price, description, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.isDelete = false;
    this.date = date();
  }
}
module.exports = Cards;
