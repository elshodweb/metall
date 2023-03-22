const { render } = require("ejs");
let { Router } = require("express");
const dashboardController = require("../controllers/dashboard");
const getHtml = require("../controllers/getHtml");

let htmlRouter = Router();

htmlRouter.get("/", getHtml);
htmlRouter.get(["/dashboard","/dashboard/:id"], dashboardController);

module.exports = htmlRouter;
