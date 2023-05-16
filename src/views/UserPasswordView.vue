<template>
  <WhiteHeader class="headerPasarela" tipo="backHeader"></WhiteHeader>
  <PopUpModal
    :is-opened="true"
    v-if="this.showPopUp"
    msj="LA CONTRASEÑA HA SIDO ACTUALIZADA CORRECTAMENTE"
  ></PopUpModal>
  <section v-if="carga">
    <div class="showAccountInfo">
      <UserUpdatePassword
        @changePopUpState="setToTrue"
        :userData="this.userData"
        class="selectedMenu"
      >
      </UserUpdatePassword>
    </div>
    <router-view></router-view>

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
import PopUpModal from "@/components/popUpModal.vue";
export default {
  name: "UserDataView",
  data() {
    return {
      userData: null,
      carga: false,
      modo: "datosUsuario",
      showPopUp: false,
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
    setToTrue(val) {
      this.showPopUp = val;
    },
  },
  components: {
    WhiteHeader,
    LoadingSpinner,
    UserInformation,
    RightDesktopMenu,
    ButtonComponent,
    UserUpdatePassword,
    PopUpModal,
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";
@import "../styles/views/UserPasswordView.scss";
</style>
