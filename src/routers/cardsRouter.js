const { Router } = require("express");
const { post_card, delete_card, put_card } = require("../controllers/cardsController");

let cardsRouter = Router();

cardsRouter.post("/cards",post_card)
cardsRouter.delete("/cards/:id",delete_card)
cardsRouter.put("/cards/:id",put_card)

module.exports = cardsRouter;
