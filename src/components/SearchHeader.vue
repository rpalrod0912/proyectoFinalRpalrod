<template>
  <header id="searchHeader">
    <MenuGeneral
      menuButtonColor="Dark"
      id="searchBusqueda"
      @click="check"
      class="menu"
    ></MenuGeneral>
    <img class="logo" :src="this.logo" />
    <ul class="searchHeaderUl">
      <li>
        <img @click="closeMenu" :src="this.deleteIcon" />
      </li>
      <li>
        <img :src="this.userIcon" />
      </li>
      <li>
        <img :src="this.carritoIcon" />
      </li>
    </ul>
  </header>
</template>
<script>
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
      console.log(this.logo);
      console.log(this.searchIcon);
      console.log(this.userIcon);
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
  components: { MenuGeneral, MenuBusqueda },
  props: {
    tipo: "String",
    menuButtonColor: "Black",
  },
};
</script>
<style lang="scss" scoped>
header {
  display: flex;
  height: 10rem;
  justify-content: space-between;
  align-items: center;
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
    width: 14rem;
    height: 2rem;
  }

  @media (max-width: 1400px) {
    .logo {
      position: revert;
    }
  }

  @media (min-width: 550px) and (max-width: 780px) {
    .logo {
      position: sticky;
      left: 0;
    }
    .menu {
      display: none;
    }
    padding-left: 2rem;
    header img {
      width: 1.6rem;
      height: 1.6rem;
    }
    .searchHeaderUl {
      li {
        right: 0rem;
      }
    }
  }

  @media (max-width: 559px) {
    .logo {
      position: sticky;
      left: 7%;
      width: 8em;
      height: 1.4em;
    }
    .menu {
      display: none;
    }
    padding-left: 2rem;
    header img {
      width: 1.6rem;
      height: 1.6rem;
    }
    .searchHeaderUl {
      li {
        right: -2em;
      }
    }
  }
}
</style>
