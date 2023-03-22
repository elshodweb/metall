const axiosInstanse = require("../axios");
const axios = require("axios");
let getHtml = (req, res) => {
  try {
    axios
      .all([
        axiosInstanse.get("/hero"),
        axiosInstanse.get("/about"),
        axiosInstanse.get("/cards"),
        axiosInstanse.get("/info"),
      ])
      .then(
        axios.spread((hero, about, cards, info) => {
          console.log(cards.data);
          res.render("index", {
            hero: hero.data,
            about: about.data,
            cards: cards.data,
            info: info.data,
          });
        })
      );
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
module.exports = getHtml;
