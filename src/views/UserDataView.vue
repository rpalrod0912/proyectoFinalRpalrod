<template>
  <WhiteHeader class="headerPasarela" tipo="backHeader"></WhiteHeader>
  <section v-if="carga">
    <UserInformation
      v-if="this.modo === 'datosUsuario'"
      class="selectedMenu"
    ></UserInformation>
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
  },
};
</script>
<style lang="scss">
.selectedMenu {
  padding-top: 10rem;
}
</style>
