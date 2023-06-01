<template>
  <input
    @click="menuAction(true)"
    id="RightMenu__toggle"
    type="checkbox"
    name="checkBusqueda"
  />

  <label class="headerHoverLabel" @click="menuAction(true)" for="checkBusqueda">
    <img
      id="loginMenuId"
      class="headerHoverLabel"
      :src="this.modo"
      alt="Persona"
    />
  </label>

  <ul v-if="!this.authentication" class="RightMenu__box">
    <div class="cabeceraMenu">
      <h1 class="TopMenu__item textoGruesoh1">ACCEDER</h1>
      <img @click="menuAction(false)" :src="this.deleteIcon" alt="eliminar" />
    </div>
    <form @submit.prevent="continueLogin" class="contenidoLogin">
      <label for="emailPhoneInput" class="TopMenu__item textoGruesoh1">
        INTRODUCE TU NÚMERO DE TELÉFONO O E-MAIL
      </label>
      <input
        v-model="mail"
        id="emailPhoneInput"
        name="emailPhoneInput"
        placeholder="Email/Número Móvil"
        type="text"
      />
      <input id="sigInButton" type="submit" class="nextButtonSubmit" />
      <p class="TopMenu__item textoPlanoFino">O si lo prefieres</p>
      <button @click="googleSignIn()" class="socialButton">
        <img src="../assets/gmail.png" alt="gmail img" />
        <p>CONTINUAR CON GMAIL</p>
      </button>
      <button class="socialButton">
        <img src="../assets/facebook.png" alt="facebook img" />
        <p>CONTINUAR CON FACEBOOK</p>
      </button>

      <p class="TopMenu__item textoPlanoFino">
        Al iniciar sesión con mi login social, acepto vincular mi cuenta
        conforme a la Política de Privacidad
      </p>
      <p class="TopMenu__item textoPlanoFino">
        Utilizaremos el teléfono / correo electrónico indicado para enviar el
        código de verificación.
      </p>
    </form>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
  <ul v-if="this.authentication" class="RightMenu__box">
    <div v-if="cargando">
      <div class="cabeceraMenu">
        <h1 class="TopMenu__item textoGruesoh1">
          HOLA {{ userName.toUpperCase() }}
          {{ userLastName.toUpperCase() }}
        </h1>
        <img
          class="authCloseMenu"
          @click="menuAction(false)"
          :src="this.deleteIcon"
        />
      </div>
      <div class="menuOptions">
        <div class="parentOptionsContainer">
          <div
            style="margin-top: 1rem"
            @click="this.$router.push('/pedidos')"
            class="usOption"
          >
            <h2>Mis Compras</h2>
            <img
              class="menuOptionsImg"
              src="../assets/Caja.png"
              alt="Compras img"
            />
          </div>
          <div @click="this.$router.push('/tuinformacion')">
            <h2>Datos Personales</h2>
            <img
              class="menuOptionsImg"
              src="../assets/huella.png"
              alt="huella digital img"
            />
          </div>
          <div @click="this.$router.push('/contacto')">
            <h2>Contacto</h2>
            <img
              class="menuOptionsImg"
              src="../assets/contact-mail.png"
              alt="correo electrónico img"
            />
          </div>
          <div @click="this.$router.push('/guiadecompra')">
            <h2>Guía de compra</h2>
            <img
              class="menuOptionsImg"
              src="../assets/infoIcon.png"
              alt="información img"
            />
          </div>
        </div>
        <input
          @click="logOut"
          class="nextButtonSubmit"
          type="button"
          value="CERRAR SESIÓN"
        />
      </div>
    </div>
    <div class="loadingLogin" v-else>
      <LoadingSpinner></LoadingSpinner>

      <input
        @click="logOut"
        class="nextButtonSubmit"
        type="button"
        value="CERRAR SESIÓN"
      />
    </div>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
</template>
<script>
/*eslint-disable */

import {
  auth,
  googleProvider,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  signInWithRedirect,
  linkWithPopup,
  getAdditionalUserInfo,
  fetchSignInMethodsForEmail,
  RecaptchaVerifier,
  signOut,
} from "@/auth/firebaseConfig.js";
import useValidate from "@vuelidate/core";
import axios from "axios";
import { API_URL } from "@/helpers/basicHelpers";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
  numeric,
  helpers,
} from "@vuelidate/validators";
import LoadingSpinner from "./LoadingSpinner.vue";

const phoneRegex = /\d{9}/;

export default {
  async created() {
    if (this.color === "Dark") {
      this.modo = this.UserOscuro;
      this.deleteIcon = this.deleteOscuro;
    } else {
      this.modo = this.UserClaro;
      this.deleteIcon = this.deleteClaro;
    }
  },
  data() {
    return {
      modo: null,
      deleteIcon: null,
      UserClaro: require("../assets/usuario.png"),
      UserOscuro: require("../assets/blackUser.png"),
      deleteClaro: require("../assets/DeleteIcon.png"),
      deleteOscuro: require("../assets/DeleteIcon.png"),
      mail: "",
      cargando: false,
      userName: null,
      userLastName: null,
    };
  },
  name: "LoginMenu",
  props: {
    color: String,
    authentication: Boolean,
    userData: Object,
  },
  watch: {
    authentication: function (newVal, oldVal) {
      if (newVal === true && this.userData !== null) {
        this.cargando = true;
      }
    },
    userData: function (newVal, oldVal) {
      if (newVal !== null && this.authentication === true) {
        this.cargando = true;
        let datos = JSON.parse(JSON.stringify(this.userData));
        this.userName = datos.nombre;
        this.userLastName = datos.apellidos;
      }
    },
  },
  validations() {
    return {
      mail: { required },
    };
  },
  methods: {
    async getGoogleRedirectToken() {
      await getRedirectResult(auth)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    async googleSignIn() {
      await signInWithPopup(auth, googleProvider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          var loggedInUser = result.user;
          const isNewUser = result.additionalUserInfo.isNewUser;
          if (isNewUser) {
            loggedInUser.delete().then(() => {
              auth.signOut("SIGNED OUT");
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });

      //await signInWithRedirect(auth, googleProvider);
      // await this.getGoogleRedirectToken();
    },
    async continueLogin() {
      if (phoneRegex.test(this.mail)) {
        return this.$router.push({
          name: "login",
          query: { phone: this.mail },
          params: {
            loginMode: "sms",
          },
        });
      }
      await fetchSignInMethodsForEmail(auth, this.mail)
        .then((signInMethods) => {
          if (signInMethods.length) {
            // The email already exists in the Auth database. You can check the
            // sign-in methods associated with it by checking signInMethods array.
            // Show the option to sign in with that sign-in method.
            const pageBody = document.querySelector("body");
            this.$router.push({
              name: "login",
              query: { email: this.mail },
              params: {
                loginMode: "password",
              },
            });
            pageBody.classList.toggle("bodyStyle");
          } else {
            // User does not exist. Ask user to sign up.
            const pageBody = document.querySelector("body");
            this.$router.push({
              name: "register",
            });
            pageBody.classList.toggle("bodyStyle");
          }
        })
        .catch((error) => {
          // Some error occurred.
        });
    },
    async logOut() {
      await signOut(auth)
        .then(() => {
          this.$store.commit("setCurrentAuth", false);
          this.$store.commit("setCurrentUser", null);
          this.$store.commit("setCurrentCartLength", null);
          this.$store.commit("setCurrentMail", null);
          this.$router.push("/");
        })
        .catch((error) => {
          ("ALGO OCURRIO");
        });
    },
    menuAction(bool) {
      document.querySelector("#RightMenu__toggle").checked = bool;
      if (bool === true) {
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "0";
        document.getElementById("carritoMenuId").style.display = "none";
        const pageBody = document.querySelector("body");
        pageBody.classList.add("bodyStyle");
      }
      if (bool === false) {
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "1";
        const pageBody = document.querySelector("body");
        document.getElementById("carritoMenuId").style.display = "flex";

        pageBody.classList.remove("bodyStyle");
      }
    },
  },
  components: { LoadingSpinner },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

@include headerIconHover;

//Needed helpers/mixings.scss to execute correctly LoginMenu.scss
@import "../styles/layout/LoginMenu.scss";
</style>
