let {Router} = require("express");
const aboutRouter = require("./aboutRouter");
const getterRouter = require("./allGetRouter");
const cardsRouter = require("./cardsRouter");
const conatctRouter = require("./contactsRouter");
const heroRouter = require("./heroRouter");
const htmlRouter = require("./htmlRouter");
const infoRouter = require("./infoRouter");

let routers = Router()

routers.use(getterRouter);
routers.use(htmlRouter);

routers.use("/api", [
  cardsRouter,
  heroRouter,
  aboutRouter,
  infoRouter,
  conatctRouter,
]);
module.exports = routers