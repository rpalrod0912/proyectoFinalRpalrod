<template>
  <input id="FilterMenu__toggle" type="checkbox" name="checkBusqueda" />
  <ButtonComponent
    @click="menuAction(true)"
    class="btnFiltrado"
    msj="FILTRAR PRODUCTOS"
  ></ButtonComponent>
  <ul class="filterMenu__box">
    <div class="cabeceraMenu">
      <h1 class="TopMenu__item textoGruesoh1">FILTRAR</h1>
      <img @click="menuAction(false)" :src="this.deleteIcon" />
    </div>

    <section class="secColor">
      <h1>Colores</h1>
      <label class="allColors">
        <input
          type="radio"
          name="colorRadio"
          @click="this.$emit('cambColor', 'Ninguno')"
        />
        <div>
          <p>TODOS</p>
        </div>
      </label>
      <div class="colorDiv">
        <label
          v-for="(color, index) in colores"
          class="labelColorButton"
          for="colorRadio"
          :key="index"
        >
          <!--Si ponemos atributo name A UN NOMBRE QUE No tengan atributos en comin se cambiara a poderser marcar todos-->
          <input
            type="radio"
            :id="`colorRadio${color.color}`"
            name="colorRadio"
            class="radioColor"
            :value="color"
            @click="this.$emit('cambTalla', color)"
          />
          <span
            @click="changeColor(`#colorRadio${color.color}`, color)"
            :style="{ backgroundColor: color.estilo }"
          ></span>
        </label>
      </div>
    </section>
    <section class="secTallas">
      <h1>Tallas</h1>
      <label class="allColors">
        <input
          type="radio"
          name="tallaRadio"
          @click="this.$emit('cambTalla', 'Ninguno')"
        />
        <div>
          <p>TODAS</p>
        </div>
      </label>
      <div class="colorDiv">
        <label
          v-for="(talla, index) in tallas"
          class="labelColorButton"
          for="tallaRadio"
          :key="index"
        >
          <input
            type="radio"
            :id="`tallaRadio${talla}`"
            name="tallaRadio"
            class="radioColor"
            :value="talla"
          />
          <span @click="changeTalla(`#tallaRadio${talla}`, talla)">{{
            talla
          }}</span>
        </label>
      </div>
    </section>
    <section class="secButton secColor">
      <span class="labelForSale" for="saleCheck">
        <ButtonComponent
          @click="changeSaleState('#saleCheck')"
          class="saleButton"
          id="buttonSale"
          msj="¡OFERTAS!"
        ></ButtonComponent>
      </span>
      <div class="greyContainer"></div>
      <input type="checkbox" class="check" id="saleCheck" name="saleCheck" />
    </section>
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
import ButtonComponent from "./ButtonComponent.vue";

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
  },
  data() {
    return {
      salesCheck: false,
      modo: null,
      deleteIcon: null,
      UserClaro: require("../assets/usuario.png"),
      UserOscuro: require("../assets/blackUser.png"),
      deleteClaro: require("../assets/DeleteIcon.png"),
      deleteOscuro: require("../assets/DeleteIcon.png"),
      mail: "",
      userName: null,
      userLastName: null,
      colores: [
        {
          color: "Blanco",
          estilo: "white",
        },
        {
          color: "Negro",
          estilo: "black",
        },
        {
          color: "Azul",
          estilo: "blue",
        },
        {
          color: "Rojo",
          estilo: "red",
        },
        {
          color: "Verde",
          estilo: "green",
        },
      ],
      tallas: [
        "S",
        "M",
        "L",
        "XL",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
      ],
    };
  },
  emits: {
    cambTalla: null,
    cambColor: null,
    cambSale: null,
  },
  name: "FilterMenu",
  props: {
    color: String,
    userData: Object,
  },
  watch: {
    userData: function (newVal, oldVal) {
      if (newVal !== null && this.authentication === true) {
        this.cargando = true;
        let datos = JSON.parse(JSON.stringify(this.userData));
        this.userName = datos.nombre;
        this.userLastName = datos.apellidos;
      }
    },
    salesCheck: function (newVal, oldVal) {
      if (newVal) {
        document.querySelector("#buttonSale").classList.remove("saleButton");

        document.querySelector("#buttonSale").classList.add("saleButtonCheck");
      } else {
        document
          .querySelector("#buttonSale")
          .classList.remove("saleButtonCheck");
        document.querySelector("#buttonSale").classList.add("saleButton");
      }
    },
  },
  validations() {
    return {
      mail: { required },
    };
  },
  methods: {
    changeSaleState(name) {
      let elementOferta = document.querySelector(name);
      if (this.salesCheck) {
        this.salesCheck = false;
        this.$emit("cambSale", false);
      } else {
        this.salesCheck = true;

        this.$emit("cambSale", true);
      }
    },
    changeTalla(name, talla) {
      document.querySelector(name).checked = true;
      this.$emit("cambTalla", talla);
    },
    changeColor(name, color) {
      document.querySelector(name).checked = true;
      this.$emit("cambColor", color);
    },
    menuAction(bool) {
      document.querySelector("#FilterMenu__toggle").checked = bool;
      if (bool === true) {
        document.getElementById("headerId").style.display = "none";
      }
      if (bool === false) {
        document.getElementById("headerId").style.display = "flex";
      }
    },
  },
  components: { LoadingSpinner, ButtonComponent },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";
@import "../styles/components/FilterMenu.scss";
</style>
