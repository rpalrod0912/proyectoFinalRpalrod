<template>
  <div>
    <form @submit.prevent="passwordUpdate()" class="updateData" novalidate>
      <h1>ACTUALIZAR CONTRASEÑA</h1>

      <div class="updateSec1">
        <label
          id="labelOldPwd"
          :class="
            v$.oldPwd.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
          for="oldPwd"
        >
          <input
            class="inputUpdateData"
            v-model="this.oldPwd"
            name="oldPwd"
            type="password"
            id="pwdDataInput"
            required
          />
          <p @click="focusInput('pwdDataInput', 'labelOldPwd')">
            Antigua Contraseña
          </p>
          <div class="borderBottom"></div>
        </label>

        <label
          id="labelNewPwd"
          :class="
            v$.newPassword.newPwd.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
          for="newPwd"
        >
          <input
            class="inputUpdateData"
            v-model="this.newPassword.newPwd"
            name="newPwd"
            type="password"
            id="newPwdDataInput"
            required
          />
          <p @click="focusInput('newPwdDataInput', 'labelNewPwd')">
            Nueva Contraseña
          </p>
          <img
            v-if="!this.modoTextoInput1"
            @click="showPassword('newPwdDataInput', 'modoTextoInput1')"
            src="../assets/UnHideIcon.png"
          />
          <img
            v-else
            @click="showPassword('newPwdDataInput', 'modoTextoInput1')"
            src="../assets/HideIcon.png"
          />
          <div class="borderBottom"></div>
        </label>
        <label
          id="labelConfirmNewPwd"
          :class="
            v$.newPassword.confirmNewPwd.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
          for="confirmNewPwd"
        >
          <input
            class="inputUpdateData"
            name="confirmNewPwd"
            v-model="this.newPassword.confirmNewPwd"
            type="password"
            id="confirmNewPwdDataInput"
            required
          />
          <p @click="focusInput('confirmNewPwdDataInput', 'labelNewPwd')">
            Repetir Nueva Contraseña
          </p>
          <img
            class="pd-3rem"
            v-if="!this.modoTextoInput2"
            @click="showPassword('confirmNewPwdDataInput', 'modoTextoInput2')"
            src="../assets/UnHideIcon.png"
          />

          <img
            v-else
            class="pd-3rem"
            @click="showPassword('confirmNewPwdDataInput', 'modoTextoInput2')"
            src="../assets/HideIcon.png"
          />

          <div class="borderBottom"></div>
        </label>
      </div>
      <div v-if="!this.isOgPwd" class="infoPanel">
        <img src="../assets/warning.png" alt="imagenInformativa" />
        <p>Contraseña Antigua Incorrecta</p>
      </div>
      <div v-if="v$.newPassword.confirmNewPwd.$error" class="infoPanel">
        <img src="../assets/warning.png" alt="imagenInformativa" />
        <p>Contraseña demasiado insegura</p>
      </div>
      <div v-if="v$.newPassword.confirmNewPwd.$error" class="infoPanel">
        <img src="../assets/warning.png" alt="imagenInformativa" />
        <p>Las contraseñas no coinciden</p>
      </div>
      <input type="submit" class="putDataSubmit" value="GUARDAR" />
    </form>
  </div>
</template>
<script>
/*eslint-disable */
import axios from "axios";
import { EmailAuthProvider } from "firebase/auth";
import {
  app,
  signOut,
  auth,
  updatePassword,
  reauthenticateWithCredential,
} from "@/auth/firebaseConfig.js";
import { API_URL } from "@/helpers/basicHelpers";
import useVuelidate from "@vuelidate/core";
import ButtonComponent from "./ButtonComponent.vue";
import "firebase/auth";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
  numeric,
  helpers,
} from "@vuelidate/validators";
const bcrypt = require("bcryptjs");
const passwordRegex = helpers.regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
);

const reauthWithOldPwd = async (oldPassword) => {
  const user = auth.currentUser;
  const cred = EmailAuthProvider.credential(
    auth.currentUser.email,
    oldPassword
  );
  let valid;
  await reauthenticateWithCredential(user, cred)
    .then((res) => {
      debugger;
      valid = true;
    })
    .catch((err) => {
      debugger;
      console.log(err.message);
      valid = false;
    });
  return valid;
};
//Old pwd validator

const hasPwdMatches = (plainTxt, hash) => {};

export default {
  name: "UserUpdatePassword",
  created() {
    console.log(this.userData.pwd);
    hasPwdMatches("Rafapr_01", this.userData.pwd);
  },
  data() {
    return {
      v$: useVuelidate(),
      oldPwd: "",
      newPassword: {
        newPwd: "",
        confirmNewPwd: "",
      },
      isOgPwd: true,
      modoTextoInput1: false,
      modoTextoInput2: false,
    };
  },
  validations() {
    return {
      oldPwd: {
        required,
        passwordRegex,
      },
      newPassword: {
        newPwd: { required, passwordRegex },
        confirmNewPwd: {
          required,
          sameAs: sameAs(this.newPassword.newPwd, this.userData.pwd),
        },
      },
    };
  },
  props: {
    userData: Object,
  },
  emits: {
    changePopUpstate: null,
  },
  methods: {
    async logOut() {
      await signOut(auth)
        .then(() => {
          this.$store.commit("setCurrentAuth", false);
          this.$store.commit("setCurrentUser", null);
          this.$store.commit("setCurrentCartLength", null);
          this.$store.commit("setCurrentMail", null);
          setInterval(() => {
            this.$router
              .push({
                name: "login",
                query: { email: this.userData.mail },
              })
              .then(() => {
                this.$router.go();
              });
          }, 2000);
        })
        .catch((error) => {
          ("ALGO OCURRIO");
        });
    },

    focusInput(id, idLabel) {
      const elemento = document.querySelector(`#${id}`);
      if (document.activeElement !== elemento) {
        elemento.focus();
      }
    },
    async putData() {
      debugger;
      //ACTUALIZAMOS PASSWORD EN FIREBASE
      let status;
      const datosUsuario = {
        pwd: this.newPassword.newPwd,
      };
      await updatePassword(auth.currentUser, this.newPassword.newPwd)
        .then(async () => {
          const data = await axios
            .put(`${API_URL}users/${this.userData.idUser}`, datosUsuario)
            .then((res) => (status = res.status))
            .catch((error) => error);
        })
        .catch((error) => {
          error;
        });

      //LUEGO DE ACTUALIZAR EN FIREBAE, ACTUALIZAMOS EN NUESTRA BD

      console.log(status);
      if (status === 200) {
        this.exito = true;
      }
    },
    async passwordUpdate() {
      debugger;
      this.v$.$validate();
      console.log(this.v$);
      console.log(`El usurio es ${await reauthWithOldPwd(this.oldPwd)}`);
      debugger;
      if (reauthWithOldPwd(this.oldPwd)) {
        console.log("Contraseña Valida");
      } else {
        console.log("Contraseña No Valida");
      }

      if (!this.v$.$error && (await reauthWithOldPwd(this.oldPwd))) {
        console.log("TODO BIEN");
        await this.putData();
        if (this.exito === true) {
          this.$emit("changePopUpState", true);
          await this.logOut();

          /*this.$router
            .push({
              name: "Inicio",
              query: { recienRegistrado: "SI" },
            })
            .then(() => {
              this.$router.go();
            });*/
        }
      }
      if (!(await reauthWithOldPwd(this.oldPwd))) this.isOgPwd = false;
      console.log("ALGO ANDA MAL");
      console.log(this.v$.$error);
      this.v$.$validate();
    },
    showPassword(id, dataState) {
      let element = document.querySelector(`#${id}`);
      if (element.type === "password") {
        element.type = "text";
        if (dataState === "modoTextoInput1") {
          this.modoTextoInput1 = true;
        }
        if (dataState === "modoTextoInput2") {
          this.modoTextoInput2 = true;
        }
      } else {
        element.type = "password";
        this.dataState = false;
        if (dataState === "modoTextoInput1") {
          this.modoTextoInput1 = false;
        }
        if (dataState === "modoTextoInput2") {
          this.modoTextoInput2 = false;
        }
      }
    },
  },
  components: { ButtonComponent },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
@include inputTypeSubmit;
@include infoPanel;
@import "../styles/components/UserUpdatePassword.scss"; //@include updatePasswordForm;
</style>
