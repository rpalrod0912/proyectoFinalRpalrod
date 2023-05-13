<template>
  <div>
    <form @submit.prevent="emailUpdate()" class="updateData" novalidate>
      <h1>ACTUALIZAR EMAIL</h1>

      <div class="updateSec1">
        <label
          id="labelOldPwd"
          :class="
            v$.pwd.$error === true ? 'labelUpdateDataError' : 'labelUpdateData'
          "
          for="oldPwd"
        >
          <input
            class="inputUpdateData"
            v-model="this.pwd"
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
        <label id="labelNewPwd" class="labelUpdateData" for="newPwd">
          <input
            :class="
              v$.oldMail.$error === true
                ? 'inputUpdateDataError'
                : 'inputUpdateData'
            "
            v-model="this.oldMail"
            name="oldMail"
            type="text"
            id="newPwdDataInput"
            required
          />
          <p @click="focusInput('newPwdDataInput', 'labelNewPwd')">
            Antiguo Email
          </p>
        </label>
        <label
          id="labelConfirmNewPwd"
          class="labelUpdateData"
          for="confirmNewPwd"
        >
          <input
            :class="
              v$.newMail.$error === true
                ? 'inputUpdateDataError'
                : 'inputUpdateData'
            "
            name="newMail"
            v-model="this.newMail"
            type="text"
            id="confirmNewPwdDataInput"
            required
          />
          <p @click="focusInput('confirmNewPwdDataInput', 'labelNewPwd')">
            Nuevo Email
          </p>
        </label>
      </div>
      <div v-if="!this.validPwd" class="infoPanel">
        <img src="../assets/warning.png" alt="imagenInformativa" />
        <p>Contraseña Incorrecta</p>
      </div>
      <div v-if="v$.oldMail.$error" class="infoPanel">
        <img src="../assets/warning.png" alt="imagenInformativa" />
        <p>Email Antiguo Incorrecto</p>
      </div>

      <div v-if="v$.newMail.$error" class="infoPanel">
        <img src="../assets/warning.png" alt="imagenInformativa" />
        <p>Utiliza un formato correcto de email</p>
      </div>
      <input type="submit" class="putDataSubmit" value="GUARDAR" />
    </form>
  </div>
</template>
<script>
/*eslint-disable */
import axios from "axios";
import { API_URL } from "@/helpers/basicHelpers";
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
import useVuelidate from "@vuelidate/core";
import { updateEmail, auth, signOut } from "@/auth/firebaseConfig.js";

const bcrypt = require("bcryptjs");
const passwordRegex = helpers.regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
);

export default {
  name: "UserUpdateMail",

  data() {
    return {
      v$: useVuelidate(),
      pwd: "",
      oldMail: "",
      newMail: "",
      exito: false,
      validPwd: true,
    };
  },
  props: {
    userData: Object,
  },
  emits: {
    changePopUpState: null,
  },
  validations() {
    return {
      pwd: {
        required,
        passwordRegex,
      },
      oldMail: {
        required,
        sameAs: sameAs(this.userData.mail),
      },
      newMail: {
        required,
        email,
      },
    };
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
                query: { email: this.newMail },
              })
              .then(() => {
                this.$router.go();
              });
          }, 2000);
          /*
          this.$router.push({
            name: "login",
            query: { email: this.newMail },
          });
          */
        })
        .catch((error) => {
          ("ALGO OCURRIO");
        });
    },
    async emailUpdate() {
      debugger;
      this.v$.$validate();
      console.log(this.v$);
      if (!this.v$.$error && (await this.validateOriginalPwd())) {
        console.log("TODO BIEN");
        debugger;
        await this.putData();
        if (this.exito === true) {
          debugger;
          this.$emit("changePopUpState", true);

          await this.logOut();

          /*
          this.$router
            .push({
              name: "Inicio",
              query: { recienRegistrado: "SI" },
            })
            .then(() => {
              this.$router.go();
            });*/
        }
      }
      if (!(await this.validateOriginalPwd())) this.validPwd = false;
      console.log("ALGO ANDA MAL");
      console.log(this.v$.$error);
      this.v$.$validate();
    },
    async putData() {
      //ACTUALIZAMOS PASSWORD EN FIREBASE
      let status;
      const datosUsuario = {
        mail: this.newMail,
      };
      await updateEmail(auth.currentUser, this.newMail)
        .then(async () => {
          ("ACTUALIZADO PWD!!");
          const data = await axios
            .put(`${API_URL}users/${this.userData.idUser}`, datosUsuario)
            .then((res) => (status = res.status))
            .catch((error) => error);
          console.log(status);
        })
        .catch((error) => {
          error;
        });

      //LUEGO DE ACTUALIZAR EN FIREBAE, ACTUALIZAMOS EN NUESTRA BD

      if (status === 200) {
        this.exito = true;
      }
    },
    async validateOriginalPwd() {
      debugger;
      let isPassword;
      await bcrypt.compare(this.pwd, this.userData.pwd).then(function (result) {
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

.updateData {
  h1 {
    padding-bottom: 3rem;
  }
  label {
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
  }
  .saveDataButton {
    width: 20rem;
  }
}
.selectedMenu .updateData .dateInput {
  p {
    bottom: 5.3em;
  }
}

.pd-3rem {
  padding-right: 2.3rem;
}
.updateSec1 {
  flex-direction: column;
}
@include updateDataForm;
@include infoPanel;
</style>
