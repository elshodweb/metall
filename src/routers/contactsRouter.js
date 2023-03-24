const { Router } = require("express");
const { post_contact,  delete_contact, called_contact } = require("../controllers/contactsController");

let conatctRouter = Router();

conatctRouter.post("/contacts", post_contact);
conatctRouter.delete("/contacts/:id", delete_contact);
conatctRouter.put("/contacts/:id", called_contact);

module.exports = conatctRouter;
