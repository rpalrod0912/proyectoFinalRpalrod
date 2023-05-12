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
import { app, auth, updatePassword } from "@/auth/firebaseConfig.js";
import { API_URL } from "@/helpers/basicHelpers";
import useVuelidate from "@vuelidate/core";
import ButtonComponent from "./ButtonComponent.vue";
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

//Old pwd validator

const hasPwdMatches = (plainTxt, hash) => {};

export default {
  name: "UserUpdatePassword",
  created() {
    console.log(this.userData.pwd);
    debugger;
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
  methods: {
    async validateOriginalPwd() {
      debugger;
      let isPassword;
      await bcrypt
        .compare(this.oldPwd, this.userData.pwd)
        .then(function (result) {
          debugger;
          console.log(result);
          isPassword = result;
        });
      console.log(isPassword);
      return isPassword;
    },
    focusInput(id, idLabel) {
      const elemento = document.querySelector(`#${id}`);
      if (document.activeElement !== elemento) {
        elemento.focus();
      }
    },
    async putData() {
      //ACTUALIZAMOS PASSWORD EN FIREBASE
      await updatePassword(auth.currentUser, this.newPassword.newPwd)
        .then(() => {
          ("ACTUALIZADO PWD!!");
        })
        .catch((error) => {
          error;
        });
      const datosUsuario = {
        pwd: this.newPassword.newPwd,
      };
      //LUEGO DE ACTUALIZAR EN FIREBAE, ACTUALIZAMOS EN NUESTRA BD
      let status;
      const data = await axios
        .put(`${API_URL}users/${this.userData.idUser}`, datosUsuario)
        .then((res) => (status = res.status))
        .catch((error) => error);
      console.log(status);
      if (status === 200) {
        this.exito = true;
      }
    },
    async passwordUpdate() {
      debugger;
      this.v$.$validate();
      console.log(this.v$);
      if (!this.v$.$error && (await this.validateOriginalPwd())) {
        console.log("TODO BIEN");
        debugger;
        await this.putData();
        if (this.exito === true) {
          this.$router
            .push({
              name: "Inicio",
              query: { recienRegistrado: "SI" },
            })
            .then(() => {
              this.$router.go();
            });
        }
      }
      if (!(await this.validateOriginalPwd())) this.isOgPwd = false;
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
.updateData {
  h1 {
    padding-bottom: 3rem;
  }
  label {
    margin-top: 0.6rem;
    margin-bottom: 2rem;
  }
  .saveDataButton {
    width: 22rem;
  }
}
p {
  position: relative;
  bottom: 2.6rem;
  left: 2rem;
  transition: 0.07s;
}
.selectedMenu .updateData .updateSec1 {
  .inputUpdateData:has(:focus) ~ p {
    bottom: 10.1rem;
  }
}
.selectedMenu .updateData .dateInput {
  p {
    bottom: 5.3em;
  }
}

.updateData {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/*
.inputUpdateData:invalid:focus-within ~ div {
  position: relative;
  top: 2px;
  width: 100%;
  border-bottom: 2px solid red;
}
.inputUpdateData:focus ~ div {
  position: relative;
  top: 2px;
  width: 100%;
  border-bottom: 2px solid green;
}*/
.pd-3rem {
  padding-right: 2.3rem;
}

.labelUpdateData {
  margin: 0.4rem;
  background-color: #f9f9f9;
  border: none;
  /* height: 1rem; */
  padding-top: 1.7rem;
  border-bottom: 1px solid #c8c8c8;
  transition: 0.07s;
  font-size: 0.9rem;
  border-radius: 4px;
  padding-right: 4rem;
  height: 3rem;
  border-bottom: 1px solid #c8c8c8;

  border-radius: 4px;
}
.labelUpdateDataGreen {
  margin: 0.4rem;
  background-color: #f9f9f9;
  border: none;
  /* height: 1rem; */
  padding-top: 1.7rem;
  transition: 0.07s;
  font-size: 0.9rem;
  border-radius: 4px;
  padding-right: 4rem;
  height: 3rem;
  border-bottom: 2px solid green;

  border-radius: 4px;
}
.labelUpdateDataError {
  margin: 0.4rem;
  background-color: #f9f9f9;
  border: none;
  /* height: 1rem; */
  padding-top: 1.7rem;
  transition: 0.07s;
  font-size: 0.9rem;
  border-radius: 4px;
  padding-right: 4rem;
  height: 3rem;
  border-bottom: 2px solid red;

  border-radius: 4px;
}
.updateSec1 {
  flex-direction: column;
  @include inputPwd;

  img {
    width: 2.1rem;
    height: 2.5rem;
    position: relative;
    left: 17.5rem;

    bottom: 3.2rem;
  }
  input[type="text"],
  input[type="password"],
  input[type="mail"],
  input[type="text"]:focus,
  input[type="password"]:focus,
  input[type="mail"]:focus {
    background: transparent;
    border: none;
    outline-width: 0;
    height: 1.5rem;
  }

  .inputUpdateData:not(:focus):invalid ~ p {
    position: relative;
    left: 2rem;
    bottom: 1.3rem;
  }
}

//@include updatePasswordForm;
</style>
