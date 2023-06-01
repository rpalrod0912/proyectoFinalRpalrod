<template>
  <input
    @click="menuAction(true)"
    id="TopMenu__toggle"
    style="display: none"
    type="checkbox"
    name="checkBusqueda"
  />

  <label id="searchImg" @click="menuAction(true)" for="checkBusqueda">
    <img
      id="searchImg"
      class="searchBar searchMenu"
      :src="this.modo"
      alt="lupa"
    />

    <img
      id="searchImg"
      class="searchIcon"
      v-if="this.color === 'Dark'"
      src="../assets/lupaNegra.png"
      alt="lupaNegra"
    />
    <img
      id="searchImg"
      class="searchIcon"
      v-else
      src="../assets/LupaBlanca.png"
      alt="lupaBlanca"
    />
  </label>

  <ul class="TopMenu__box">
    <div class="headerBusq">
      <SearchHeader
        class="TopMenu__item"
        menuButtonColor="Dark"
        tipo="Dark"
      ></SearchHeader>
    </div>
    <div class="TopMenu__item cajaBusqueda">
      <div class="lineaBusqueda">
        <img src="../assets/lupaBlack.png" alt="lupaNegra" />
        <input
          type="text"
          v-model="searchInput"
          class="inputBusqueda"
          placeholder="¿QUÉ ESTÁS BUSCANDO?"
          @keydown.enter.prevent="buscarElementos"
        />
      </div>
      <div class="separadorAlterno"></div>
    </div>
    <p class="TopMenu__item textoGrueso">Trending</p>
    <p class="TopMenu__item textoPlano">Sudadera Hombre Blanca</p>
    <p class="TopMenu__item textoPlano">Chaqueta Hombre</p>
    <p class="TopMenu__item textoPlano">Chaqueta Camiseta Blanca</p>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
</template>
<script>
/*eslint-disable */

import SearchHeader from "../components/SearchHeader.vue";
import axios from "axios";
import { API_URL } from "@/helpers/basicHelpers";
export default {
  created() {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
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
    buscarElementos() {
      this.$router.push({
        name: "products",
        query: { prodFiltrados: this.searchInput },
      });
    },

    menuAction(bool) {
      document.querySelector("#logoWhite").classList.toggle("headerError");
      document.querySelector("#loginMenuId").classList.toggle("headerError");
      document.querySelector("#carritoMenuId").classList.toggle("headerError");

      document.querySelector("#TopMenu__toggle").checked = bool;
      if (bool === true) {
        document.querySelector("#headerId").classList.add("hideHeader");
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "0";
      }
      if (bool === false) {
        document.querySelector("#headerId").classList.remove("hideHeader");

        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "1";
      }
      const pageBody = document.querySelector("body");
      pageBody.classList.toggle("bodyStyle");
    },
  },
  data() {
    return {
      modo: null,
      busquedaClaro: require("../assets/whiteSearchBar.png"),
      busquedaOscuro: require("../assets/searchBlack.png"),
      lupaClara: require("../assets/LupaBlanca.png"),
      lupaNegra: require("../assets/lupaNegra.png"),
      searchsArray: null,
      searchInput: "",
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";

@include headerIconHover;
@import "../styles/layout/MenuBusqueda.scss";
</style>
