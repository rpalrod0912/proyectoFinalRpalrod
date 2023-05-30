<template>
  <header class="searchHeaderClass" id="searchHeader">
    <MenuGeneral
      menuButtonColor="Dark"
      id="searchBusqueda"
      @click="check"
      class="menu"
    ></MenuGeneral>
    <img class="logo" :src="this.logo" />
    <div class="searchHeaderContainer">
      <div>
        <img @click="closeMenu" :src="this.deleteIcon" />
      </div>
    </div>
  </header>
</template>
<script>
import CarritoMenu from "./CarritoMenu.vue";
import MenuBusqueda from "./MenuBusqueda.vue";
import MenuGeneral from "./MenuGeneral.vue";

export default {
  /*eslint-disable */
  created() {
    this.tipoHeader = this.tipo;
    if (this.tipoHeader === "Dark") {
      this.logo = this.iconos.logoOscuro;
      this.userIcon = this.iconos.userOscuro;
      this.deleteIcon = this.iconos.deleteOscuro;
      this.carritoIcon = this.iconos.carritoOscuro;
    } else {
      this.logo = this.iconos.logoClaro;
      this.userIcon = this.iconos.userClaro;
      this.deleteIcon = this.iconos.deleteClaro;
      this.carritoIcon = this.iconos.carritoClaro;
    }
  },
  name: "SearchHeader",

  data() {
    return {
      tipoHeader: "white",
      iconos: {
        logoClaro: require("../assets/LogoOscuroTransparente.png"),
        logoOscuro: require("../assets/LogoOscuroSinFondo.png"),
        busquedaClaro: require("../assets/whiteSearchBar.png"),
        busquedaOscuro: require("../assets/searchBlack.png"),
        deleteClaro: require("../assets/DeleteIcon.png"),
        deleteOscuro: require("../assets/DeleteIcon.png"),

        userClaro: require("../assets/usuario.png"),
        userOscuro: require("../assets/blackUser.png"),
        carritoClaro: require("../assets/bolsoBlanco.png"),
        carritoOscuro: require("../assets/bolso.png"),
      },
      logo: null,
      searchIcon: null,
      userIcon: null,
      carritoIcon: null,
      deleteIcon: null,
    };
  },
  methods: {
    closeMenu() {
      document.querySelector("#headerId").classList.remove("hideHeader");

      const pageBody = document.querySelector("body");
      pageBody.classList.toggle("bodyStyle");
      document.querySelector("#logoWhite").classList.toggle("headerError");
      document.querySelector("#loginMenuId").classList.toggle("headerError");
      document.querySelector("#carritoMenuId").classList.toggle("headerError");

      document.querySelector("#TopMenu__toggle").checked = false;
      document
        .getElementById("menuGeneral")
        .querySelector(".menu__btn").style.opacity = "1";
    },
  },
  components: { MenuGeneral, MenuBusqueda, CarritoMenu },
  props: {
    tipo: "String",
    menuButtonColor: "Black",
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
@import "../styles/layout/SearchHeader.scss";
</style>
