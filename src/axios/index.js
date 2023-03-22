let Axios = require("axios")

const axiosInstanse = Axios.create({
  baseURL: 'http://localhost:3000'
});

module.exports = axiosInstanse