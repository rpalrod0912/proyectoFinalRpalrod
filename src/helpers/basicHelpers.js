/*eslint-disable */

//const API_URL = "http://localhost:8080/";
const API_URL = "https://rpalrodpostgreapi.onrender.com/";

function toHome() {
  this.$router.push("/");
}

function scrollTop() {
  window.scrollTo(0, 0);
}

module.exports = { toHome, API_URL, scrollTop };
