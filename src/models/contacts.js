let date = require("./../utils/date");
class Contacts {
  constructor(
    id,
    name,
    email,
    phone,
    message,
    isColled = false,
    isDelete = false
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.message = message;
    this.isColled = isColled;
    this.isDelete = isDelete;
    this.date = date();
  }
}
module.exports = Contacts;
