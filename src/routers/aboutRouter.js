const { Router } = require("express");
const { post_about } = require("../controllers/aboutController");

let aboutRouter = Router();

aboutRouter.post("/about", post_about);

module.exports = aboutRouter;
