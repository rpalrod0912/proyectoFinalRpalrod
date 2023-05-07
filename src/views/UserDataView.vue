<template>
  <WhiteHeader class="headerPasarela" tipo="backHeader"></WhiteHeader>
  <section v-if="carga">
    <div class="showAccountInfo">
      <UserInformation
        :userData="this.userData"
        v-if="this.modo === 'datosUsuario'"
        class="selectedMenu"
      ></UserInformation>

      <UserUpdatePassword
        :userData="this.userData"
        v-if="this.modo === 'passwordUsuario'"
        class="selectedMenu"
      >
      </UserUpdatePassword>

      <ButtonComponent
        v-if="this.modo !== 'passwordUsuario'"
        @click="this.modo = 'passwordUsuario'"
        class="colorButton saveDataButton"
        msj="ACTUALIZAR CONTRASEÑA"
      ></ButtonComponent>
      <ButtonComponent
        v-if="this.modo !== 'datosUsuario'"
        @click="this.modo = 'datosUsuario'"
        class="colorButton saveDataButton"
        msj="DATOS DE LA CUENTA"
      ></ButtonComponent>
      <ButtonComponent
        class="colorButton saveDataButton"
        msj="ACTUALIZAR EMAIL"
      ></ButtonComponent>
      <ButtonComponent
        class="colorButton saveDataButton"
        msj="ACTUALIZAR TELÉFONO"
      ></ButtonComponent>
    </div>

    <RightDesktopMenu
      selectedOption="secondOption"
      :userData="this.userData"
    ></RightDesktopMenu>
  </section>
  <section v-else>
    <LoadingSpinner></LoadingSpinner>
  </section>
</template>
<script>
/*eslint-disable */
import {
  app,
  auth,
  createUserWithEmailAndPassword,
} from "@/auth/firebaseConfig.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
  numeric,
  helpers,
} from "@vuelidate/validators";
import { API_URL } from "@/helpers/basicHelpers";
import UserInformation from "../components/UserInformation.vue";
import WhiteHeader from "@/components/WhiteHeader.vue";
import RightDesktopMenu from "@/components/RightDesktopMenu.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import UserUpdatePassword from "@/components/UserUpdatePassword.vue";
export default {
  name: "UserDataView",
  data() {
    return {
      userData: null,
      carga: false,
      modo: "datosUsuario",
    };
  },
  async mounted() {
    if (document.querySelector("body").classList.contains("bodyStyle")) {
      document.querySelector("body").classList.toggle("bodyStyle");
    }
    await this.getUserData();
    this.carga = true;
  },
  methods: {
    async getUserData() {
      this.carga = false;
      const data = await axios
        .get(`${API_URL}users/email/${this.$store.state.currentMail}`)
        .then((res) => res.data)
        .catch((error) => error);
      this.userData = data;
    },
  },
  components: {
    WhiteHeader,
    LoadingSpinner,
    UserInformation,
    RightDesktopMenu,
    ButtonComponent,
    UserUpdatePassword,
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

.showAccountInfo {
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  display: flex;
  width: 70%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .colorButton {
    background-color: white;
    p {
      color: #242424;
    }
    transition: 0.4s;
    border-radius: 1px solid #242424;
  }
  .colorButton:hover {
    background-color: #242424;
    scale: (1.03);
    p {
      color: white;
    }
    border-radius: 1px solid #242424;
  }
}
.saveDataButton {
  width: 30rem;
  margin-bottom: 1rem;
}
.selectedMenu {
  @include fuenteSemiBold;

  //width: 70%;
  padding-top: 10rem;
}
section {
  display: flex;
}
</style>
