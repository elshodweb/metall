const joi = require("joi");
const IO = require("../utils/IO");
const Info = require("../models/info");

let scheme = joi.object({
  location: joi.string().min(6).required(),
  phone: joi.string().min(6).required(),
  email: joi.string().email().required(),
  facebook: joi.string().min(6).required(),
  twitter: joi.string().min(6).required(),
  linkedin: joi.string().min(6).required(),
  instagram: joi.string().min(6).required(),
  sertification: joi.string().min(6).required(),
});

const infoFile = new IO("info");

const post_info = async (req, res) => {

  try {
    const { location, phone, email, facebook, twitter, linkedin, instagram,sertification } = req.body;

    const { error } = scheme.validate({ location, phone, email, facebook, twitter, linkedin, instagram,sertification });
    if (error) {
      throw new Error(error.message);
    }

    const info = new Info(location, phone, email, facebook, twitter, linkedin, instagram,sertification );

    infoFile.write(info);
    res.redirect("/dashboard/info");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { post_info };
