<template>
  <div>
    <form @submit.prevent="submitUpdate()" class="updateData" novalidate>
      <h1 class="secTitle">DATOS PERSONALES</h1>

      <div class="genderDiv">
        <label for="gender">
          <input name="gender" type="radio" value="Hombre" />Hombre
        </label>
        <label for="gender">
          <input name="gender" type="radio" value="Mujer" />Mujer
        </label>
      </div>

      <div class="updateSec1">
        <label
          :class="
            v$.nombre.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
        >
          <input
            class="inputUpdateData"
            v-model="this.nombre"
            name="nombre"
            type="text"
            required
            id="nameDataInput"
          />
          <p @click="focusInput('nameDataInput')">Nombre</p>
        </label>
        <label
          :class="
            v$.apellidos.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
          for="apellidos"
        >
          <input
            class="inputUpdateData"
            v-model="this.apellidos"
            name="apellidos"
            type="text"
            id="apellidosDataInput"
            required
          />
          <p @click="focusInput('apellidosDataInput')">Apellidos</p>
        </label>
      </div>
      <div class="updateSec2">
        <label
          :class="
            v$.fechaNac.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
          for="fechaNac"
        >
          <input
            class="inputUpdateData"
            v-model="this.fechaNac"
            name="fechaNac"
            type="date"
            required
          />
          <h1 class="dateP">Fecha de Nacimiento</h1>
        </label>
        <label
          :class="
            v$.phone.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
          for="telefonoMovil"
        >
          <input
            class="inputUpdateData"
            v-model="this.phone"
            name="telefonoMovil"
            id="phoneDataInput"
            type="text"
            required
          />
          <p @click="focusInput('phoneDataInput')">Numero móvil</p>
        </label>
      </div>
      <h2 class="secTitle">DIRECCIÓN DE FACTURACIÓN</h2>
      <div class="updateSec3">
        <label
          :class="
            v$.direccion.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
          for="direccion"
        >
          <input
            class="inputUpdateData"
            name="direccion"
            v-model="this.direccion"
            id="direccionDataInput"
            type="text"
            required
          />
          <p @click="focusInput('direccionDataInput')">Dirección domicilo</p>
        </label>

        <label class="labelUpdateData" for="moreInfo">
          <input
            class="inputUpdateData"
            id="moreInfoDataInput"
            v-model="this.infoPersonal"
            name="moreInfo"
            type="text"
            required
          />
          <p @click="focusInput('moreInfoDataInput')">Mas información...</p>
        </label>
      </div>
      <div class="updateSec4">
        <label
          :class="
            v$.codPostal.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
          for="codPostal"
        >
          <input
            v-model="this.codPostal"
            id="codpostalDataInput"
            name="codigoPostal"
            class="inputUpdateData"
            type="text"
            required
          />
          <p @click="focusInput('codpostalDataInput')">Código Postal</p>
        </label>
        <label
          :class="
            v$.ciudad.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
          for="ciudad"
        >
          <input
            class="inputUpdateData"
            id="ciudadDataInput"
            name="ciudad"
            v-model="this.ciudad"
            type="text"
            required
          />
          <p @click="focusInput('ciudadDataInput')">Ciudad</p>
        </label>
      </div>
      <div class="updateSec5">
        <label
          :class="
            v$.provincia.$error === true
              ? 'labelUpdateDataError'
              : 'labelUpdateData'
          "
          for="provincia"
        >
          <input
            id="provinciaDataInput"
            class="inputUpdateData"
            v-model="this.provincia"
            name="provincia"
            type="text"
            required
          />
          <p @click="focusInput('provinciaDataInput')">Provincia</p>
        </label>
      </div>
      <div
        v-if="
          v$.nombre.$error ||
          v$.apellidos.$error ||
          v$.fechaNac.$error ||
          v$.phone.$error
        "
        class="infoPanel"
      >
        <img src="../assets/warning.png" alt="imagenInformativa" />
        <p>Por favor verifica que todos tus datos personales están rellenos.</p>
      </div>
      <div
        v-if="
          v$.ciudad.$error ||
          v$.direccion.$error ||
          v$.codPostal.$error ||
          v$.provincia.$error
        "
        class="infoPanel"
      >
        <img src="../assets/warning.png" alt="imagenInformativa" />
        <p>
          Por favor verifica que todos lo campos de dirección de facturación
          están rellenos.
        </p>
      </div>
      <input class="putDataSubmit" type="submit" value="GUARDAR" />
    </form>
  </div>
</template>
<script>
/*eslint-disable */
import ButtonComponent from "./ButtonComponent.vue";
import { app, auth } from "@/auth/firebaseConfig.js";
import { API_URL, toHome } from "@/helpers/basicHelpers";
import useVuelidate from "@vuelidate/core";

import axios from "axios";
import {
  requiredUnless,
  required,
  email,
  sameAs,
  minLength,
  maxLength,
  numeric,
  helpers,
} from "@vuelidate/validators";
import PopUpModal from "./popUpModal.vue";

const passwordRegex = helpers.regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
);

export default {
  name: "UserInformation",

  data() {
    return {
      v$: useVuelidate(),
      nombre: this.userData.nombre,
      apellidos: this.userData.apellidos,
      phone: this.userData.phone,
      fechaNac: this.userData.bornDate,
      direccion: this.userData.direccion,
      infoPersonal: this.userData.info,
      codPostal: this.userData.cp,
      ciudad: this.userData.ciudad,
      provincia: this.userData.provincia,
      reload: toHome,
      showPopUp: false,
      exito: false,
    };
  },
  validations() {
    return {
      nombre: { required, minLength: minLength(3) },
      apellidos: { required, maxLength: minLength(6) },
      fechaNac: { required },
      phone: {
        required,
        numeric,
        minLength: minLength(9),
        maxLength: maxLength(9),
      },
      ciudad: {
        required,
        minLength: minLength(2),
      },
      direccion: {
        required,
        minLength: minLength(10),
      },
      codPostal: {
        required,
        numeric,
        minLength: minLength(5),
        maxLength: maxLength(5),
      },
      provincia: {
        required,
        minLength: minLength(4),
      },
    };
  },
  props: {
    userData: Object,
  },
  emits: {
    changePopUpState: null,
    updateWindow: null,
  },
  methods: {
    focusInput(id) {
      const elemento = document.querySelector(`#${id}`);
      if (document.activeElement !== elemento) {
        elemento.focus();
      }
    },
    async putData() {
      debugger;
      const datosUsuario = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        phone: this.phone,
        fechaNac: this.fechaNac,
        direccion: this.direccion,
        info: this.infoPersonal,
        cp: this.codPostal,
        ciudad: this.ciudad,
        provincia: this.provincia,
      };
      let status;
      console.log(datosUsuario);
      const data = await axios
        .put(`${API_URL}users/${this.userData.idUser}`, datosUsuario)
        .then((res) => (status = res.status))
        .catch((error) => error);
      console.log(status);
      if (status === 200) {
        this.exito = true;
      }
    },
    async submitUpdate() {
      debugger;
      console.log(this.v$);
      // this.v$.$touch();

      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("TODO BIEN");
        await this.putData();
        if (this.exito === true) {
          this.$emit("changePopUpState", true);
          this.$emit("updateWindow", true);
        }
      }
      console.log("ALGO ANDA MAL");
      console.log(this.v$.$error);
    },
  },
  components: { ButtonComponent, PopUpModal },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";

.selectedMenu .updateData .dateInput {
  p {
    bottom: 5.3em;
  }
}

@include updateDataForm;
@include infoPanel;
.infoPanel {
  p {
    max-width: 24rem;
  }
}
.userOrderMenu {
  display: none;
}
</style>
