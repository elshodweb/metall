const { Router } = require("express");
const { post_hero, delete_hero, put_hero } = require("../controllers/heroController");

let heroRouter = Router();

heroRouter.post("/hero",post_hero)
heroRouter.delete("/hero/:id",delete_hero)
heroRouter.put("/hero/:id",put_hero)

module.exports = heroRouter;
