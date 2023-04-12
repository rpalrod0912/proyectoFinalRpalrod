/*eslint-disable */

//const API_URL = "https://rpalrodcommerceapi.onrender.com/v1/api/";

const API_URL = "http://localhost:8080/";

function toHome() {
  this.$router.push("/");
}

function scrollTop() {
  window.scrollTo(0, 0);
}

module.exports = { toHome, API_URL, scrollTop };
