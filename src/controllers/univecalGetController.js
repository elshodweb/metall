let IO = require("../utils/IO");

function univercalGetController(element) {
  let elementFile = new IO(element);
  return async (req, res) => {
    try {
      let elementContent = await elementFile.read();
      let id = req?.params?.id;

      if (req.path == "/cards" || req.path == "/cards/" + id) {
        elementContent = elementContent.filter((el) => !el.isDelete);
      }

      if (id) {
        let foundElement = elementContent.find(
          (u) => u.id == id && !u.isDelete
        );
        if (!foundElement) {
          throw new Error("topilmadi");
        }
        res.status(200).send(foundElement);
      } else {
        res.status(200).send(elementContent);
      }
    } catch (err) {
      res.status(200).json({ message: err.message });
    }
  };
}
module.exports = univercalGetController;
