const joi = require("joi");
const IO = require("../utils/IO");
const Hero = require("../models/hero");

let scheme = joi.object({
  title: joi.string().min(6).max(15).required(),
  subtitle: joi.string().min(3).max(20).required(),
  description: joi.string().min(100).max(400).required(),
});

const heroFile = new IO("hero");


const post_hero = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;
    
    
    const { error } = scheme.validate({ title, subtitle, description  });
    if (error) {
      throw new Error(error.message);
    }

    
    const heros = await heroFile.read();
    const id = (heros?.at(-1)?.id || 0) + 1;
    const hero = new Hero(id,  title, subtitle, description  );
    heros.push(hero);

    heroFile.write(heros);
    res.redirect("/dashboard/hero")
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


const delete_hero = async (req, res) => {
  try {
    const id = +req.params.id;
    const heros = await heroFile.read();

    let foundIndex = heros.findIndex((c) => id == c.id && !c.isDelete);
    if (foundIndex < 0) {
      throw new Error("hero not found for this id");
    }
    heros[foundIndex].isDelete = true;

    heroFile.write(heros);

    res.status(200).json({ message: "hero deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


let schemeForPut = joi.object({
  title: joi.string().min(6).max(15),
  subtitle: joi.string().min(3).max(20),
  description: joi.string().min(100).max(400),
});

const put_hero = async (req, res) => {
  try {
    const id = req.params.id;
    let { title, subtitle,description } = req.body;
    
    
    let { error } = schemeForPut.validate({ title, subtitle,description});
    if (error) {
      throw new Error(error.message);
    }

    const heros = await heroFile.read();

    let foundIndex = heros.findIndex((c) => id == c.id && !c.isDelete);
    if (foundIndex < 0) {
      throw new Error("hero not found for this id");
    }

    title == undefined ? (title = cards[foundIndex].title) : title;
    subtitle == undefined ? (subtitle = cards[foundIndex].subtitle) : subtitle;
    description == undefined
      ? (description = cards[foundIndex].description)
      : description;

    heros[foundIndex] = new Hero(id,  title, subtitle, description  );
    heroFile.write(heros);

    res.status(200).json({ message: "hero edited" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


module.exports = {post_hero,delete_hero,put_hero};
