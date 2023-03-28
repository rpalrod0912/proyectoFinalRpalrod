<template>
  <input id="checkedBusqueda" type="checkbox" name="checkBusqueda" />

  <label @click="menuAction(true)" for="checkBusqueda">
    <img class="searchBar searchMenu" :src="this.modo" />
  </label>
  <ul class="menu__box">
    <WhiteHeader tipo="Dark"></WhiteHeader>

    <p>Búsqueda</p>
    <p>Trending</p>
    <p>Sudadera Hombre Blanca</p>
    <p>Chaqueta Hombre</p>
    <p>Chaqueta Camiseta Blanca</p>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
</template>
<script>
import WhiteHeader from "@/components/WhiteHeader.vue";

export default {
  /*eslint-disable */
  created() {
    if (this.color === "Dark") {
      this.modo = this.busquedaOscuro;
    } else {
      this.modo = this.busquedaClaro;
    }
  },
  components: WhiteHeader,
  name: "MenuBusqueda",
  props: {
    color: String,
  },
  methods: {
    menuAction(bool) {
      document.querySelector("#checkedBusqueda").checked = bool;
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
  width: 100%;
}

.bodyStyle {
  overflow: hidden;
}

#menu__toggle {
  z-index: 1;
  width: 1rem;
  position: relative;
  right: -1rem;
  opacity: 0;
}
#menu__toggle:checked + .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked + .menu__btn > span::before {
  top: 0;
  transform: rotate(0deg);
  background-color: black;
}
#menu__toggle:checked + .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
  background-color: black;
  .greyContainer {
    visibility: visible;
  }
}
#menu__toggle:checked ~ .menu__box {
  left: 0 !important;
  .greyContainer {
    left: 20% !important;
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
.menu__box {
  display: block;
  position: fixed;
  top: 0;
  left: -100%;
  //width: 300px;
  width: 20%;
  height: 100%;
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
.menu__item {
  display: block;
  padding: 12px 24px;
  color: #333;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition-duration: 0.25s;
}
.menu__item:hover {
  background-color: #cfd8dc;
}
</style>
