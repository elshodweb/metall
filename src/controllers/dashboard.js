const axiosInstanse = require("../axios");

const dashboardController = async (req, res) => {
  try {
    const id = req?.params?.id;
    if (id) {
      let response = await axiosInstanse.get("/"+id);
      let data = response.data;
      res.render("pages/dashboard/routes/"+ id,{data});
    }else{
      res.redirect("dashboard/cards")
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
module.exports = dashboardController;
