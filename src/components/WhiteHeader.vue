<template>
  <header>
    <MenuGeneral
      :color="this.tipoHeader"
      id="menuGeneral"
      @click="check"
      class="menu"
    ></MenuGeneral>
    <ul>
      <li>
        <div class="headerMedia">
          <MenuBusqueda :color="this.tipoHeader"></MenuBusqueda>
        </div>
      </li>
    </ul>
    <img class="logo" :src="this.logo" />
    <ul class="userOptions">
      <li>
        <div class="headerWithoutMedia">
          <MenuBusqueda :color="this.tipoHeader"></MenuBusqueda>
        </div>
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
    width: 14rem;
    height: 2rem;
  }

  @media (max-width: 1400px) {
    .logo {
      position: revert;
    }
  }
  @media (min-width: 897px) {
    .headerMedia {
      display: none;
    }
    .searchIcon {
      display: none;
    }
  }

  @media (max-width: 897px) {
    .headerWithoutMedia {
      display: none;
    }

    header {
      width: 0%;

      ul {
        img {
          width: 2rem;
          height: 2rem;
        }
      }
    }
    .searchBar {
      display: none;
    }
    .logo {
    }
  }
}
@media (min-width: 400px) and (max-width: 634px) {
  .userOptions {
    position: relative;
    right: 4em;
  }
  .menu__btn {
    left: 1em;
    top: 4.8em;
  }
  header {
    width: 100%;
    .headerMedia {
      right: 7rem;
      position: relative;
    }
    .logo {
      position: absolute;
      left: 23%;
      width: 12em;
      height: 1.8em;
    }
    img {
      width: 1.6rem;
      height: 1.6rem;
    }
    ul {
      marker: none;
      margin: 0rem;
      li {
        right: 4rem;
        position: relative;
        margin: 0rem;
      }
      right: -29.9rem;
    }
  }
}
@media (min-width: 300px) and (max-width: 399px) {
  .userOptions {
    position: relative;
    right: 4em;
  }
  .menu__btn {
    left: 1em;
    top: 4.8em;
  }
  header {
    width: 100%;
    .headerMedia {
      right: 7rem;
      position: relative;
    }
    .logo {
      position: absolute;
      left: 23%;
      width: 12em;
      height: 1.8em;
    }
    img {
      width: 1.6rem;
      height: 1.6rem;
    }
    ul {
      marker: none;
      margin: 0rem;
      li {
        right: 4rem;
        position: relative;
        margin: 0rem;
      }
      right: -29.9rem;
    }
  }
}
</style>
