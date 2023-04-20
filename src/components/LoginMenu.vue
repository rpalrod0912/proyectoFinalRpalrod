<template>
  <input
    @click="menuAction(true)"
    id="RightMenu__toggle"
    type="checkbox"
    name="checkBusqueda"
  />

  <label @click="menuAction(true)" for="checkBusqueda">
    <img :src="this.modo" />
  </label>

  <ul v-if="!this.authentication" class="RightMenu__box">
    <div class="cabeceraMenu">
      <h1 class="TopMenu__item textoGruesoh1">ACCEDER</h1>
      <img @click="menuAction(false)" :src="this.deleteIcon" />
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
      <input type="submit" class="nextButtonSubmit" />
      <p class="TopMenu__item textoPlanoFino">O si lo prefieres</p>
      <button class="socialButton">
        <img src="../assets/gmail.png" />
        <p>CONTINUAR CON GMAIL</p>
      </button>
      <button class="socialButton">
        <img src="../assets/facebook.png" />
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
        <img @click="menuAction(false)" :src="this.deleteIcon" />
      </div>

      <input
        @click="logOut"
        class="nextButtonSubmit"
        type="button"
        value="CERRAR SESIÓN"
      />
    </div>
    <LoadingSpinner v-else></LoadingSpinner>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
</template>
<script>
/*eslint-disable */

import {
  auth,
  fetchSignInMethodsForEmail,
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

export default {
  /*eslint-disable */
  async created() {
    if (this.color === "Dark") {
      this.modo = this.UserOscuro;
      this.deleteIcon = this.deleteOscuro;
    } else {
      this.modo = this.UserClaro;
      this.deleteIcon = this.deleteClaro;
    }
    console.log(this.authentication);
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
      console.log("ES AHORA", newVal, "ERA ANTES ", oldVal);
      if (newVal === true && this.userData !== null) {
        this.cargando = true;
      }
    },
    userData: function (newVal, oldVal) {
      console.log("ES AHORA", newVal, "ERA ANTES ", oldVal);
      if (newVal !== null && this.authentication === true) {
        this.cargando = true;
        let datos = JSON.parse(JSON.stringify(this.userData));
        console.log(datos);
        console.log(datos.nombre);
        console.log(datos.apellidos);
        this.userName = datos.nombre;
        this.userLastName = datos.apellidos;
        console.log(this.name);
        console.log(this.userLastName);
      }
    },
  },
  validations() {
    return {
      mail: { required },
    };
  },
  methods: {
    async continueLogin() {
      console.log(auth);
      await fetchSignInMethodsForEmail(auth, this.mail)
        .then((signInMethods) => {
          console.log(signInMethods);
          if (signInMethods.length) {
            // The email already exists in the Auth database. You can check the
            // sign-in methods associated with it by checking signInMethods array.
            // Show the option to sign in with that sign-in method.
            const pageBody = document.querySelector("body");
            this.$router.push({
              name: "login",
              query: { email: this.mail },
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
    logOut() {
      signOut(auth)
        .then(() => {
          this.authentication = false;
          this.$store.commit("setCurrentAuth", this.authentication);
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
      console.log("estilos");
      /*
              if (document.getElementById("TopMenu__toggle").checked) {
                alert("checked");
              } else {box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.28);k it! Let me check it for you.");
              }
              */
    },
  },
  components: { LoadingSpinner },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

.nextButtonSubmit {
  @include loginButton("black", "white", "2rem");
  padding-top: 0rem;
  padding-bottom: 0rem;
  height: 3rem;

  margin-top: 1rem;
  margin-bottom: 1rem;
}

.socialButton {
  @include loginButton("#DADADA", "black", "0.6rem;");
  font-size: 1rem;
  justify-content: flex-start;
  img {
    padding-right: 0.4rem;
  }
  padding-top: 1.8rem;
  padding-bottom: 1.8rem;
}
.nextButton {
  @include loginButton("black", "white", "2rem");
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.contenidoLogin {
  display: flex;

  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80%;

  label {
    width: 60%;
    text-align: left;
  }

  input[type="text"],
  input[type="text"]:focus {
    margin-top: 2rem;
    height: 2.5rem;
    background: transparent;
    border: 1px solid black;
    border-radius: 10px;
    padding-left: 2rem;
    @include fuenteSemiBold;
    font-size: 1rem;
  }
}
.cabeceraMenu {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  img {
    width: 2rem;
    height: 2rem;
    position: relative;
    left: 10%;
    bottom: 1%;
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.28);
}

#checkedBusqueda {
  display: none;
}
.searchMenu {
  cursor: pointer;
}

.bodyStyle {
  overflow: hidden;
}
@include estiloMenuDerecho(
  "#RightMenu__toggle",
  ".menu__btn",
  ".RightMenu__box"
);

.TopMenu__item {
  padding: 12px 24px;
  margin-top: 0.5rem;
}
.textoPlano {
  margin-left: 9%;
  margin-right: 9%;
  @include fuenteSemiBold;
  color: #95a3a4;
  font-size: 1.2rem;
}
.textoPlanoFino {
  @include fuenteSemiBold;
  color: black;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.textoGrueso {
  margin-left: 9%;
  margin-right: 9%;
  @include fuenteSemiBold;
  color: black;
  font-size: 1.8rem;
}
.textoGruesoh1 {
  margin-left: 9%;
  margin-right: 9%;
  @include fuenteSemiBold;
  color: black;
  font-size: 1.3rem;
  text-align: center;
}
@media (min-width: 900px) and (max-width: 1430px) {
  .RightMenu__box {
    width: 31%;
  }
  #RightMenu__toggle:checked ~ .RightMenu__box .greyContainer {
    left: 0% !important;
    width: 69%;
  }
}
@media (min-width: 600px) and (max-width: 899px) {
  .RightMenu__box {
    width: 50%;
  }

  #RightMenu__toggle:checked ~ .RightMenu__box .greyContainer {
    left: -10% !important;
  }
}

@media (min-width: 300px) and (max-width: 599px) {
  .itemsBox {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    li {
      position: relative;
      right: auto;
      margin: 1rem;
    }
  }

  .RightMenu__box {
    width: 100%;
  }
  .greyContainer {
    display: none;
  }
}
</style>
