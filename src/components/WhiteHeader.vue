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
      class="informationPageLogo backHeaderLogo headerHoverLabel"
      :class="!showHeader ? 'hideLogo' : ''"
      src="../assets/LogoOscuroSinFondo.png"
    />
    <img
      v-else
      @mouseover="checkLogo()"
      @mouseout="checkLogo()"
      @click="toHome()"
      id="logoWhite"
      class="backHeaderLogo headerHoverLabel"
      :class="!showHeader ? 'hideLogo' : ''"
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
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
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

        //self.carritoNumero = await self.contarProd(user.uid);
        self.$store.commit("setCurrentAuth", true);

        self.$store.commit("setCurrentUser", user.uid);
      } else {
        self.authentication = false;
      }
    });
  },
  name: "WhiteHeader",

  data() {
    return {
      showHeader: true,
      scrollPos: 0,
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
    onScroll() {
      const currentScrollPos =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPos < 0) return;

      if (Math.abs(currentScrollPos - this.scrollPos) < 60) {
        return;
      }
      this.showHeader = currentScrollPos < this.scrollPos;
      this.scrollPos = currentScrollPos;
    },
    checkLogo() {
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
      return data;
    },
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

@include headerIconHover;
@import "../styles/layout/WhiteHeader.scss";
header {
  z-index: 4;
}
</style>
