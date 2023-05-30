<template>
  <form @submit.prevent="submitLogin" class="loginWindow">
    <label for="loginPasswordInp">
      <h1 v-if="this.loginMode === 'sms' || this.loginMode === 'mail'">
        CÓDIGO DE VERIFICACÓN
      </h1>
      <h1 v-else>INTRODUCE TU CONTRASEÑA</h1>
    </label>
    <p v-if="this.loginMode === 'sms'" class="pDescrip">
      Introduce el código que te hemos enviado al SMS al número de teléfono +34
      {{ this.userInput }}
    </p>
    <p v-else-if="this.loginMode === 'mail'" class="pDescrip">
      Accede al enlace que hemos enviado a {{ this.$route.query.email }}
    </p>
    <div id="recaptcha-container"></div>
    <div v-if="this.loginMode !== 'mail'" class="passwordInputFlex">
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
    <span class="alertText" v-if="passwordNotFound"
      >Contraseña Incorrecta
    </span>
    <span class="alertText" v-if="notVerified"
      >Verifica tu cuenta con el correo electrónico que hemos mandado a tu
      dirección de correo para iniciar sesión
    </span>
    <input v-if="this.loginMode !== 'mail'" class="loginSubmit" type="submit" />
    <input
      v-if="this.loginMode === 'sms'"
      v-model="this.code"
      type="password"
      class="loginSubmit"
      placeholder="Cod verficiacion"
    />
    <ButtonComponent
      v-if="this.loginMode === 'sms'"
      @click="this.verifyCode()"
      class="colorBtnSoc btn"
      msj="INTRODUCIR CODIGO VERIFICACION"
    ></ButtonComponent>
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
      @click="this.$emit('changeLoginType', 'mail')"
    ></ButtonComponent>
    <p
      @click="
        this.resetPassword();
        this.$emit('emailVerified', true);
      "
      v-if="this.loginMode === 'password'"
      class="underLineTxt"
    >
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
import {
  auth,
  signOut,
  signInWithPhoneNumber,
  googleProvider,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  actionCodeSettings,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from "@/auth/firebaseConfig.js";
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
      notVerified: null,
      code: null,
    };
  },
  emits: {
    changePopUpState: null,
    emailVerified: null,
    changeLoginType: null,
  },
  name: "LoginApp",
  methods: {
    formatPhoneNumber(str) {
      let result = str.replace(/.{3}/g, "$&-");
      result = result.slice(0, -1);
      return `+34 ${result}`;
    },
    verifyCode() {
      //
      let vm = this;
      let code = this.code;
      //
      window.confirmationResult
        .confirm(code)
        .then(function (result) {
          // User signed in successfully.
          var user = result.user;
          // ...
          //route to set password !
          vm.$router.push({ path: "/Inicio" });
        })
        .catch(function (error) {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    },
    async submitPhoneLogin() {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          },
        },
        auth
      );

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          window.recaptchaVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
          });
        });
    },
    async logOut() {
      await signOut(auth)
        .then(() => {
          this.$store.commit("setCurrentAuth", false);
          this.$store.commit("setCurrentUser", null);
          this.$store.commit("setCurrentCartLength", null);
          this.$store.commit("setCurrentMail", null);
        })
        .catch((error) => {
          ("ALGO OCURRIO");
        });
    },
    async resetPassword() {
      sendPasswordResetEmail(auth, this.$route.query.email)
        .then(() => {
          //Password reset email sent!
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
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
    async submitLogin() {
      if (this.loginMode === "mail") {
        await sendSignInLinkToEmail(auth, this.password, actionCodeSettings)
          .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem("emailForSignIn", this.password);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
          });
      } else if (this.loginMode === "sms") {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "loginInput",
          {
            size: "invisible",
            callback: (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              this.submitLogin();
            },
          },
          auth
        );
        const appVerifier = window.recaptchaVerifier;

        await signInWithPhoneNumber(
          auth,
          this.formatPhoneNumber(this.password),
          appVerifier
        )
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // ...
          })
          .catch((error) => {
            // Error; SMS not sent
            // ...
          });
      } else {
        await this.logInFirebase();
      }
    },
    async logInFirebase() {
      const logInData = {
        mail: this.$route.query.email,
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
          if (errorCode === "auth/user-not-found") {
            this.userNotFound = true;
          }
          if (errorCode === "auth/wrong-password") {
            this.passwordNotFound = true;
          }
        });
      this.userNotFound;
    },

    async encontrarUsuario(email) {
      const mail = email;
      const data = await axios
        .get(`${API_URL}users/email/${mail}`)
        .then((res) => {
          (res) => res.json();
        })
        .catch((error) => error);
      if (!auth.currentUser.emailVerified) {
        this.notVerified = true;
        await this.logOut();
      } else if (data !== "NOTFOUND") {
        this.$emit("changePopUpState", true);
        setInterval(() => {
          this.$router
            .push({
              name: "Inicio",
            })
            .then(() => {
              this.$router.go();
            });
        }, 2000);
      }
    },
  },
  components: { ButtonComponent },
  props: {
    loginModeProp: String,
    userInput: String,
  },
  watch: {
    loginModeProp: function (newVal, OldVal) {
      this.loginMode = newVal;
    },
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";
@import "../styles/components/LoginComponent.scss";
</style>
