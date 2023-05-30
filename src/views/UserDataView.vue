<template>
  <WhiteHeader class="headerPasarela" tipo="backHeader"></WhiteHeader>
  <PopUpModal
    :is-opened="true"
    v-if="this.showPopUp"
    msj="DATOS DE LA CUENTA CAMBIADOS CORRECTAMENTE"
  ></PopUpModal>

  <section v-if="carga">
    <div class="showAccountInfo">
      <UserInformation
        @changePopUpState="setToTrue"
        :userData="this.userData"
        class="selectedMenu"
      ></UserInformation>

      <ButtonComponent
        @click="this.$router.push('/tuinformacion/password')"
        class="colorButton saveDataButton"
        msj="ACTUALIZAR CONTRASEÑA"
      ></ButtonComponent>
      <ButtonComponent
        @click="this.$router.push('/tuinformacion/email')"
        class="colorButton saveDataButton"
        msj="ACTUALIZAR EMAIL"
      ></ButtonComponent>
    </div>

    <RightDesktopMenu
      selectedOption="secondOption"
      :userData="this.userData"
    ></RightDesktopMenu>
  </section>
  <section class="loadingUserInfo" v-else>
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
      showPopUp: false,
    };
  },
  async mounted() {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
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
@include inputTypeSubmit;
@import "../styles/views/UserDataView.scss";
</style>
