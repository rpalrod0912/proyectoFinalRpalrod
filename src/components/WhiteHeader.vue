<template>
  <header id="headerId">
    <img
      @click="$router.go(-1)"
      v-if="tipo === 'backHeader'"
      class="hoverArrow"
      src="../assets/back.png"
    />
    <MenuGeneral
      :color="this.tipoHeader"
      id="menuGeneral"
      @click="check"
      class="menu"
      v-if="tipo !== 'backHeader'"
    ></MenuGeneral>
    <ul v-if="tipo !== 'backHeader'" class="headerMedia">
      <li>
        <MenuBusqueda
          @click="closeMenu"
          :color="this.tipoHeader"
        ></MenuBusqueda>
      </li>
    </ul>
    <img
      v-if="tipo === 'backHeader'"
      @mouseover="checkLogo()"
      @mouseout="checkLogo()"
      @click="toHome()"
      id="logoWhite"
      class="backHeaderLogo headerHoverLabel"
      src="../assets/LogoOscuroSinFondo.png"
    />
    <img
      v-else
      @mouseover="checkLogo()"
      @mouseout="checkLogo()"
      @click="toHome()"
      id="logoWhite"
      class="logo headerHoverLabel"
      :src="this.logo"
    />
    <ul v-if="tipo !== 'backHeader'" class="userOptions">
      <li>
        <div class="headerWithoutMedia">
          <MenuBusqueda :color="this.tipoHeader"></MenuBusqueda>
        </div>
      </li>
      <li id="loginMenuId">
        <LoginMenu
          :userData="this.userData"
          :authentication="this.authentication"
          :color="this.tipoHeader"
        ></LoginMenu>
      </li>
      <li id="carritoMenuId">
        <CarritoMenu
          :authentication="this.authentication"
          :color="this.tipoHeader"
        ></CarritoMenu>
      </li>
    </ul>
    <div v-if="tipo === 'backHeader'" class="invisibleDiv"></div>
  </header>
</template>
<script>
/*eslint-disable */
import { isProxy, toRaw } from "vue";
import { auth, signOut } from "@/auth/firebaseConfig.js";
import CarritoMenu from "./CarritoMenu.vue";
import LoginMenu from "./LoginMenu.vue";
import MenuBusqueda from "./MenuBusqueda.vue";
import MenuGeneral from "./MenuGeneral.vue";
import axios from "axios";

import { API_URL } from "@/helpers/basicHelpers";

export default {
  /*eslint-disable */
  created() {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
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
    let self = this;
    auth.onAuthStateChanged(async function (user) {
      if (user !== null) {
        self.email = user.email;
        self.$store.commit("setCurrentMail", user.email);
        self.authentication = true;
        self.id = user.uid;
        const datosUsuario = await self.fetchUserData(user.uid);

        self.userData = JSON.parse(JSON.stringify(datosUsuario));
        console.log(self.userData);
        const carrito = JSON.parse(
          localStorage.getItem(`carrito_${user.email}`)
        );
        self.carritoNumero = carrito.cesta.length;
        self.$store.commit("setCurrentCartLength", self.carritoNumero);
        //self.carritoNumero = await self.contarProd(user.uid);
        self.$store.commit("setCurrentAuth", true);
        /*
        self.$store.commit(
          "setCurrentCartLength",
          await self.contarProd(user.uid)
        );
        */
        console.log("Autenticacion es " + self.authentication);
        self.$store.commit("setCurrentUser", user.uid);
      } else {
        self.authentication = false;
      }
    });
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
      authentication: false,
      userData: null,
    };
  },
  components: { MenuGeneral, MenuBusqueda, LoginMenu, CarritoMenu },
  props: {
    tipo: "String",
    menuButtonColor: "String",
  },
  methods: {
    checkLogo() {
      console.log(this.tipoHeader);
      console.log(this.tipo);
      if (this.tipo === "blanco") {
        if (this.logo === this.iconos.logoOscuro) {
          this.logo = this.iconos.logoClaro;
        } else {
          this.logo = this.iconos.logoOscuro;
        }
      }
    },
    toHome() {
      this.$router.push("/");
    },
    closeMenu() {
      document.getElementById("logoWhite").classList.toggle("headerError");
      document.getElementById("loginMenuId").classList.toggle("headerError");
      document.getElementById("carritoMenuId").classList.toggle("headerError");
    },
    async fetchUserData(id) {
      let datosUsuario;

      const data = await axios
        .get(`${API_URL}users/firebase/${id}`)
        .then((res) => (datosUsuario = res.data));
      console.log(data);
      return data;
    },
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

@include headerIconHover;

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
  .hoverArrow {
    margin-left: 2rem;

    transition: 0.3s;
    cursor: pointer;
  }
  .hoverArrow:hover {
    transform: scale(1.12);
  }
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
  .backHeaderLogo {
    margin-left: 15rem;
    position: sticky;
    right: 64rem;
    width: 14rem;
    height: 2rem;
    cursor: pointer;
  }
  .invisibleDiv {
    display: none;
  }

  @media (max-width: 657px) {
    .backHeaderLogo {
      width: 8rem;
      height: 1.2rem;
      margin-left: 3rem;
      position: unset;
    }
    .invisibleDiv {
      display: flex;
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 2rem;
    }
  }

  .logo {
    //position: fixed;
    left: 39%;
    width: 14rem;
    height: 2rem;
    cursor: pointer;
  }

  @media (max-width: 1400px) {
    .logo {
      position: revert;
    }
  }
  @media (min-width: 897px) {
    .headerMedia {
      .searchBar {
        display: none;
      }
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
  .secFoot2 {
    flex-direction: column;
    ul {
      flex-direction: column;
    }
  }
  .userOptions {
    position: relative;
    right: -3em;
  }
  .menu__btn {
    left: 0.5em;
    top: 4.8em;
  }
  header {
    z-index: 1;
    width: 100%;
    .headerMedia {
      left: 4.2em;
      position: fixed;
      top: 4em;
    }
    .logo {
      position: relative;
      left: 9%;
      width: 11em;
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
  .secFoot2 {
    flex-direction: column;
    ul {
      flex-direction: column;
    }
  }
  .productDiv {
    width: 70%;
  }
  .userOptions {
    position: relative;
    right: -3em;
  }
  .menu__btn {
    left: 0.5em;
    top: 4.8em;
  }
  header {
    width: 100%;
    z-index: 1;
    .headerMedia {
      left: 4em;
      position: fixed;
      top: 4em;
    }
    .logo {
      position: absolute;
      left: 34%;

      width: 7rem;
      height: 1.2rem;
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
