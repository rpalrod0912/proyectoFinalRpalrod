<template>
  <input id="TopMenu__toggle" type="checkbox" name="checkBusqueda" />

  <label @click="menuAction(true)" for="checkBusqueda">
    <img class="searchBar searchMenu" :src="this.modo" />
  </label>

  <ul class="TopMenu__box">
    <SearchHeader class="TopMenu__item" tipo="Dark"></SearchHeader>
    <p class="TopMenu__item">Búsqueda</p>
    <p class="TopMenu__item">Trending</p>
    <p class="TopMenu__item">Sudadera Hombre Blanca</p>
    <p class="TopMenu__item">Chaqueta Hombre</p>
    <p class="TopMenu__item">Chaqueta Camiseta Blanca</p>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
</template>
<script>
import SearchHeader from "../components/SearchHeader.vue";
export default {
  /*eslint-disable */
  created() {
    if (this.color === "Dark") {
      this.modo = this.busquedaOscuro;
    } else {
      this.modo = this.busquedaClaro;
    }
  },
  name: "MenuBusqueda",
  components: { SearchHeader },
  props: {
    color: String,
  },
  methods: {
    menuAction(bool) {
      debugger;
      document.querySelector("#TopMenu__toggle").checked = bool;
      document
        .getElementById("menuGeneral")
        .querySelector(".menu__btn").style.opacity = "0";

      console.log("estilos");
      /*
      if (document.getElementById("TopMenu__toggle").checked) {
        alert("checked");
      } else {
        alert("You didn't check it! Let me check it for you.");
      }
      */
    },
  },
  data() {
    return {
      modo: null,
      busquedaClaro: require("../assets/whiteSearchBar.png"),
      busquedaOscuro: require("../assets/searchBlack.png"),
    };
  },
};
</script>
<style lang="scss">
#checkedBusqueda {
  display: none;
}
.searchMenu {
  cursor: pointer;
}
.generalContainers {
  display: flex;
  z-index: 1;
}

.bodyStyle {
  overflow: hidden;
}

#TopMenu__toggle {
  z-index: 1;
  width: 1rem;
  position: relative;
  right: -1rem;
  opacity: 0;
}
#TopMenu__toggle:checked + .menu__btn > span {
  transform: rotate(45deg);
}
#TopMenu__toggle:checked + .menu__btn > span::before {
  top: 0;
  transform: rotate(0deg);
  background-color: black;
}
#TopMenu__toggle:checked + .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
  background-color: black;
  .greyContainer {
    visibility: visible;
  }
}
#TopMenu__toggle:checked ~ .TopMenu__box {
  top: 0rem !important;
  left: 0rem;
  padding: 0rem;
  .greyContainer {
    top: 80% !important;
  }
}

.menu__btn {
  position: fixed;

  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 1;
}
.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;
  transition-duration: 0.25s;
}
.menu__btn > span::before {
  content: "";
  top: -8px;
}
.menu__btn > span::after {
  content: "";
  top: 8px;
}
.TopMenu__box {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: -100%;
  //width: 300px;
  width: 100%;
  height: 60%;
  margin: 0;
  padding: 80px 0;
  list-style: none;
  background-color: white;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  transition-duration: 0.25s;
  opacity: 1;
  .greyContainer {
    left: auto;
    background-color: rgb(8 8 8);
    position: fixed;
    left: -100%;
    width: 80%;
    height: 300rem;
    z-index: 1;
    bottom: 0%;
    opacity: 0.6;
    transition-duration: 0.25s;
  }
}
.TopMenu__item {
  display: block;
  padding: 12px 24px;
  color: #333;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition-duration: 0.25s;
}
.TopMenu__item:hover {
  background-color: #cfd8dc;
}
</style>
