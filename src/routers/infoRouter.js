const { Router } = require("express");
const { post_info } = require("../controllers/infoController");

let infoRouter = Router();

infoRouter.post("/info", post_info);

module.exports = infoRouter;
