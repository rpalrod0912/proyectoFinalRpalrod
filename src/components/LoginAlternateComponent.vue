<template>
  <form @submit.prevent="submitLogin" class="loginWindow">
    <label for="loginPasswordInp">
      <h1 v-if="this.loginMode === 'sms' || this.loginMode === 'mail'">
        CÓDIGO DE VERIFICACÓN
      </h1>
      <h1 v-else>INICIA SESIÓN PARA CONTINUAR</h1>
    </label>
    <p v-if="this.loginMode === 'sms'" class="pDescrip">
      Introduce el código que te hemos enviado al SMS al número de teléfono
      +34XXXXXXXX
    </p>
    <p v-else-if="this.loginMode === 'mail'" class="pDescrip">
      Introduce el código que te hemos enviado por e-mail a tu correo
    </p>
    <div class="passwordInputFlex">
      <input
        v-model="this.correo"
        type="email"
        placeholder="Tu Correo"
        id="emailInput"
      />
    </div>
    <div class="passwordInputFlex">
      <input
        v-model="this.password"
        type="password"
        placeholder="Contraseña"
        id="loginInput"
      />

      <img
        v-if="!this.modoTexto"
        @click="showPassword()"
        src="../assets/blindIcon.png"
      />
      <img
        v-else-if="this.modoTexto"
        @click="showPassword()"
        src="../assets/SeeThrough.png"
      />
    </div>
    <span class="alertText" v-if="passwordNotFound || userNotFound"
      >Datos Incorrectos
    </span>
    <span class="alertText" v-if="missingPassword">
      Rellena todos lo campos
    </span>
    <input class="loginSubmit" type="submit" />
    <ButtonComponent
      v-if="this.loginMode !== 'password'"
      class="btn"
      msj="No he recibido el código"
    ></ButtonComponent>
    <ButtonComponent
      v-if="this.loginMode === 'password'"
      class="colorBtnSoc btn"
      msj="Acceder con código vía SMS"
    ></ButtonComponent>
    <ButtonComponent
      v-if="this.loginMode === 'password'"
      class="colorBtnSoc btn"
      msj="Acceder con código vía e-mail"
    ></ButtonComponent>
    <p v-if="this.loginMode === 'password'" class="underLineTxt">
      Restablecer Contraseña
    </p>
    <p v-else-if="this.loginMode !== 'password'" class="underLineTxt">
      Acceder con contraseña
    </p>
    <p v-if="this.loginMode === 'sms'" class="underLineTxt">
      Acceder con código vía e-mail
    </p>
    <p v-if="this.loginMode === 'mail'" class="underLineTxt">
      Acceder con código vía SMS
    </p>
  </form>
</template>
<script>
/*eslint-disable */
import { auth, signInWithEmailAndPassword } from "@/auth/firebaseConfig.js";
import { API_URL } from "@/helpers/basicHelpers";
import axios from "axios";

import ButtonComponent from "./ButtonComponent.vue";

export default {
  created() {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };

    this.modoTexto = false;
    this.loginMode = this.loginModeProp;
    if (document.querySelector("body").classList.contains("bodyStyle")) {
      document.querySelector("body").classList.toggle("bodyStyle");
    }
  },
  data() {
    return {
      modoTexto: null,
      mostrarTexto: require("../assets/SeeThrough.png"),
      ocultarTexto: require("../assets/blindIcon.png"),
      loginMode: null,
      password: "",
      passwordNotFound: false,
      correo: null,
      missingPassword: false,
      userNotFound: false,
    };
  },
  name: "LoginAlternateComponent",
  methods: {
    showPassword() {
      let element = document.querySelector("#loginInput");
      if (element.type === "password") {
        element.type = "text";
        this.modoTexto = true;
      } else {
        element.type = "password";
        this.modoTexto = false;
      }
    },
    submitLogin() {
      this.logInFirebase();
    },
    async logInFirebase() {
      const logInData = {
        mail: this.correo,
        pwd: this.password,
      };
      await signInWithEmailAndPassword(auth, logInData.mail, logInData.pwd)
        .then((userCredential) => {
          this.userNotFound = false;
          this.passwordNotFound = false;
          const user = userCredential.user;
          this.encontrarUsuario(user.email);
          this.$store.commit("setCurrentMail", user.email);
          if (localStorage.getItem(`carrito_${user.email}`) === null) {
            localStorage.setItem(
              `carrito_${user.email}`,
              JSON.stringify({ userId: user.uid, cesta: [] })
            );
            ("CREADO!!");
          }
          ("NO CREADO YA EXISTE");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode === "auth/user-not-found") {
            this.userNotFound = true;
          }
          if (errorCode === "auth/wrong-password") {
            this.passwordNotFound = true;
          }
          if (
            errorCode === "auth/missing-password" ||
            errorCode === "auth/missing-email"
          ) {
            this.missingPassword = true;
          }
        });
    },

    async encontrarUsuario(email) {
      const mail = email;
      const data = await axios
        .get(`${API_URL}users/email/${mail}`)
        .then((res) => {
          (res) => res.json();
        })
        .catch((error) => error);
      if (data !== "NOTFOUND") {
        this.$router.push("/pago");
      }
    },
  },
  components: { ButtonComponent },
  props: {
    loginModeProp: String,
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
@import "../styles/components/LoginAlternateComponent.scss";
</style>
