/*eslint-disable */

//const API_URL = "http://localhost:8080/";
//const API_URL = "https://rpalrodpostgreapi.onrender.com/";
//Cambio a railway para un mejor deslpliegue del Back End
const API_URL="https://porjectofinalpostgre-production-3a0c.up.railway.app/";

function toHome() {
  this.$router.push("/");
}

function scrollTop() {
  window.scrollTo(0, 0);
}

module.exports = { toHome, API_URL, scrollTop };
