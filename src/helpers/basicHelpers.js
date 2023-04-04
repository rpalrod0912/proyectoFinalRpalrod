/*eslint-disable */

const API_URL = "https://rpalrodcommerceapi.onrender.com/v1/api/";

function toHome() {
  this.$router.push("/");
}

module.exports = { toHome, API_URL };
