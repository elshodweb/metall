const { Router } = require("express");
const univercalGetController = require("../controllers/univecalGetController");

let getterRouter = Router();

getterRouter.get("/hero", univercalGetController("hero"));
getterRouter.get("/about", univercalGetController("about"));
getterRouter.get("/contacts", univercalGetController("contacts"));
getterRouter.get("/info", univercalGetController("info"));
getterRouter.get(["/cards","/cards/:id"], univercalGetController("cards"));

module.exports = getterRouter;
