const joi = require("joi");
const IO = require("../utils/IO");
const Contacts = require("../models/contacts");

let scheme = joi.object({
  name: joi.string().min(2).max(20).required(),
  email: joi.string().email().required(),
  phone: joi.string().min(6).max(25).required(),
  message: joi.string().min(80).max(400).required(),
});

const contactsFile = new IO("contacts");

let post_contact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const { error } = scheme.validate({ name, email, phone, message });
    if (error) {
      throw new Error(error.message);
    }
    const contacts = await contactsFile.read();
    const id = (contacts?.at(-1)?.id || 0) + 1;

    const contact = new Contacts(id, name, email, phone, message);
    contacts.push(contact);

    contactsFile.write(contacts);
    res.redirect("/");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const delete_contact = async (req, res) => {
  try {
    const id = +req.params.id;
    const contacts = await contactsFile.read();

    let foundIndex = contacts.findIndex((c) => id == c.id && !c.isDelete);
    if (foundIndex < 0) {
      throw new Error("contact not found for this id");
    }
    contacts[foundIndex].isDelete = true;

    contactsFile.write(contacts);

    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


const called_contact = async (req, res) => {
  try {
    const id = +req.params.id;
    const contacts = await contactsFile.read();

    let foundIndex = contacts.findIndex((c) => id == c.id && !c.isDelete);
    if (foundIndex < 0) {
      throw new Error("contact not found for this id");
    }
    contacts[foundIndex].isCalled = !contacts[foundIndex].isCalled;

    contactsFile.write(contacts);

    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



module.exports = { post_contact,delete_contact,called_contact };
