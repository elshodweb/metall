let date = require("./../utils/date");
class Contacts {
  constructor(id, name, email, phone, message) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.message = message;
    this.isDelete = false;
    this.date = date();
  }
}
module.exports = Contacts;
