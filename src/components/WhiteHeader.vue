<template>
  <header>
    <MenuGeneral
      :color="this.tipoHeader"
      id="menuGeneral"
      @click="check"
      class="menu"
    ></MenuGeneral>
    <img class="logo" :src="this.logo" />
    <ul>
      <li>
        <MenuBusqueda :color="this.tipoHeader"></MenuBusqueda>
      </li>
      <li>
        <LoginMenu :color="this.tipoHeader"></LoginMenu>
      </li>
      <li>
        <CarritoMenu :color="this.tipoHeader"></CarritoMenu>
      </li>
    </ul>
  </header>
</template>
<script>
import CarritoMenu from "./CarritoMenu.vue";
import LoginMenu from "./LoginMenu.vue";
import MenuBusqueda from "./MenuBusqueda.vue";
import MenuGeneral from "./MenuGeneral.vue";

export default {
  /*eslint-disable */
  created() {
    this.tipoHeader = this.tipo;
    if (this.tipoHeader === "Dark") {
      this.logo = this.iconos.logoOscuro;
      this.searchIcon = this.iconos.busquedaOscuro;
      this.userIcon = this.iconos.userOscuro;
      this.carritoIcon = this.iconos.carritoOscuro;
    } else {
      this.logo = this.iconos.logoClaro;
      this.searchIcon = this.iconos.busquedaClaro;
      this.userIcon = this.iconos.userClaro;
      this.carritoIcon = this.iconos.carritoClaro;
      console.log(this.logo);
      console.log(this.searchIcon);
      console.log(this.userIcon);
    }
  },
  name: "WhiteHeader",

  data() {
    return {
      tipoHeader: "white",
      iconos: {
        logoClaro: require("../assets/LogoOscuroTransparente.png"),
        logoOscuro: require("../assets/LogoOscuroSinFondo.png"),
        busquedaClaro: require("../assets/whiteSearchBar.png"),
        busquedaOscuro: require("../assets/searchBlack.png"),
        userClaro: require("../assets/usuario.png"),
        userOscuro: require("../assets/blackUser.png"),
        carritoClaro: require("../assets/bolsoBlanco.png"),
        carritoOscuro: require("../assets/bolso.png"),
      },
      logo: null,
      searchIcon: null,
      userIcon: null,
      carritoIcon: null,
    };
  },
  components: { MenuGeneral, MenuBusqueda, LoginMenu, CarritoMenu },
  props: {
    tipo: "String",
    menuButtonColor: "String",
  },
};
</script>
<style lang="scss">
header {
  height: 10rem;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  img {
    width: 2.5rem;
    height: 2.5rem;
  }
  width: 100%;
  .menu {
    margin-left: 2rem;
  }
  ul {
    list-style-type: none;

    display: flex;
    margin-right: 2rem;
    marker: none;
    .searchBar {
      width: 13rem;
      margin-left: 0px;
    }
    li {
      margin: 1rem;
    }
  }
  background-color: transparent;

  display: flex;

  .logo {
    position: fixed;
    left: 39%;
    width: 27rem;
    height: 8rem;
  }
  @media (max-width: 1400px) {
    .logo {
      position: revert;
    }
  }
}
</style>
