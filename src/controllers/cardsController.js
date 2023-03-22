const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { resolve, extname } = require("path");
const joi = require("joi");
const IO = require("../utils/IO");
const Cards = require("../models/cards");

let scheme = joi.object({
  name: joi.string().min(2).max(20).required(),
  price: joi.number().min(0).required(),
  description: joi.string().min(100).max(1000).required(),
});

const cardsFile = new IO("cards");

const post_card = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req?.files?.image;
    if (!image) {
      throw new Error("image not sent");
    }
    const { error } = scheme.validate({ name, price, description });
    if (error) {
      throw new Error(error.message);
    }
    const cards = await cardsFile.read();
    const id = (cards?.at(-1)?.id || 0) + 1;

    const extension = extname(image.name);
    const imageName = uuid() + extension;
    image.mv(resolve("src", "fileUpload", imageName));

    const card = new Cards(id, name, price, description, imageName);
    cards.push(card);

    cardsFile.write(cards);
    res.redirect("/dashboard/cards")
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const delete_card = async (req, res) => {
  try {
    const id = +req.params.id;
    const cards = await cardsFile.read();

    let foundIndex = cards.findIndex((c) => id == c.id && !c.isDelete);
    if (foundIndex < 0) {
      throw new Error("card not found for this id");
    }
    cards[foundIndex].isDelete = true;

    cardsFile.write(cards);

    res.status(200).json({ message: "card deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

let schemeForPut = joi.object({
  name: joi.string().min(2).max(20),
  price: joi.number().min(0),
  description: joi.string().min(100).max(1000),
});

const put_card = async (req, res) => {
  try {
    const id = req.params.id;
    let { name, price, description } = req.body;
    
    
    let image = req?.files?.image;
    let { error } = schemeForPut.validate({ name,price,description});
    if (error) {
      throw new Error(error.message);
    }

    if (image) {
      const extension = extname(image.name);
      let imageName = uuid() + extension;
      image.mv(resolve("src", "fileUpload", imageName));
      image = imageName;
    }
    const cards = await cardsFile.read();

    let foundIndex = cards.findIndex((c) => id == c.id && !c.isDelete);
    if (foundIndex < 0) {
      throw new Error("card not found for this id");
    }

    name == undefined ? (name = cards[foundIndex].name) : name;
    price == undefined ? (price = cards[foundIndex].price) : price;
    image == undefined ? (image = cards[foundIndex].image) : image;
    description == undefined
      ? (description = cards[foundIndex].description)
      : description;

    cards[foundIndex] = new Cards(id, name, price, description, image);
    cardsFile.write(cards);

    res.status(200).json({ message: "card edited" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { post_card, delete_card, put_card };
