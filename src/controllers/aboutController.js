const joi = require("joi");
const IO = require("../utils/IO");
const About = require("../models/about");

let scheme = joi.object({
  title: joi.string().min(6).max(20).required(),
  description: joi.string().min(100).max(500).required(),
});

const aboutFile = new IO("about");

const post_about = async (req, res) => {
  try {
    const { title, description } = req.body;

    const { error } = scheme.validate({ title, description });
    if (error) {
      throw new Error(error.message);
    }
    const about = new About(title, description);

    aboutFile.write(about);
    res.redirect("/dashboard/about");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { post_about };
