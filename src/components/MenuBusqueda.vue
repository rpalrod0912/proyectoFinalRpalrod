<template>
  <input id="TopMenu__toggle" type="checkbox" name="checkBusqueda" />

  <label @click="menuAction(true)" for="checkBusqueda">
    <img class="searchBar searchMenu" :src="this.modo" />
  </label>

  <ul class="TopMenu__box">
    <SearchHeader
      class="TopMenu__item"
      menuButtonColor="Dark"
      tipo="Dark"
    ></SearchHeader>
    <p class="TopMenu__item textoPlano">Búsqueda</p>
    <p class="TopMenu__item textoPlano">Trending</p>
    <p class="TopMenu__item textoPlano">Sudadera Hombre Blanca</p>
    <p class="TopMenu__item textoPlano">Chaqueta Hombre</p>
    <p class="TopMenu__item textoPlano">Chaqueta Camiseta Blanca</p>

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
      if (bool === true) {
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "0";
      }
      if (bool === false) {
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "1";
      }

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
<style lang="scss" scoped>
@import "../helpers/mixings.scss";

#checkedBusqueda {
  display: none;
}
.searchMenu {
  cursor: pointer;
}

.bodyStyle {
  overflow: hidden;
}
@include estiloMenuBusqueda("#TopMenu__toggle", ".menu__btn", ".TopMenu__box");

.TopMenu__item {
  padding: 12px 24px;
  margin-top: 0.5rem;
}
.textoPlano {
  @include fuenteSemiBold;
  color: #95a3a4;
  font-size: 1.2rem;
}
.TopMenu__item:hover {
  background-color: #cfd8dc;
}
</style>
