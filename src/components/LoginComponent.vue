<template>
  <form @submit.prevent="submitLogin" class="loginWindow">
    <label for="loginPasswordInp">
      <h1 v-if="this.loginMode === 'sms' || this.loginMode === 'mail'">
        CÓDIGO DE VERIFICACÓN
      </h1>
      <h1 v-else>INTRODUCE TU CONTRASEÑA</h1>
    </label>
    <p v-if="this.loginMode === 'sms'" class="pDescrip">
      Introduce el código que te hemos enviado al SMS al número de teléfono
      +34XXXXXXXX
    </p>
    <p v-else-if="this.loginMode === 'mail'" class="pDescrip">
      Introduce el código que te hemos enviado por e-mail a ********02@gmail.com
    </p>
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
    <span class="alertText" v-if="passwordNotFound"
      >Contraseña Incorrecta
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

import ButtonComponent from "./ButtonComponent.vue";

export default {
  created() {
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
    };
  },
  name: "LoginApp",
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
      debugger;
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
          console.log(error);
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
      const foundUser = await fetch(`${API_URL}users/login/${mail}`).then(
        (res) => res.json()
      );
      foundUser;
      if (foundUser !== "NOTFOUND") {
        this.$router.push("/");
      }
    },
  },
  components: { ButtonComponent },
  props: {
    loginModeProp: String,
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";
.alertText {
  @include fuenteRegular;
  font-size: 1.2em;
  color: red;
  padding-top: 1.2em;
  text-align: center;
}
.loginSubmit {
  input[type="password"],
  input[type="password"]:focus,
  input[type="text"],
  input[type="password"]:focus {
    margin-bottom: 2rem;
  }

  @include loginButton("black", "white", 3rem);
  width: 20rem;
  height: 3rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
}
.colorBtnSoc {
  background-color: #dadada;
  border: 1px white;
  p {
    color: black;
  }
}
.pDescrip {
  font-size: 1.5rem;
  width: 70%;
  text-align: center;
  color: black;
  @include fuenteRegular;
  padding-bottom: 2rem;
}
.loginWindow {
  @include formWindow;
}
@media (max-width: 800px) {
  .genericButton {
    width: 17rem;
  }
  .loginSubmit {
    width: 17rem;
  }
  .loginWindow {
    h1 {
      text-align: center;
      font-size: 1.6em;
      width: 99%;
    }
  }
  .pDescrip {
    font-size: 1.1em;
  }
}
</style>
