/*eslint-disable */

//const API_URL = "https://rpalrodcommerceapi.onrender.com/v1/api/";

const API_URL = "http://localhost:8080/";

function toHome() {
  this.$router.push("/");
}

module.exports = { toHome, API_URL };
