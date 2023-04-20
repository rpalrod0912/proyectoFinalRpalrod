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
            @click="this.$emit('cambColor', color)"
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

      <div class="colorDiv">
        <label
          v-for="(talla, index) in tallas"
          class="labelColorButton"
          for="tallaRadio"
          :key="index"
        >
          <input
            v-model="this.salesCheck"
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
    <section class="secColor">
      <span class="labelForSale" for="saleCheck">
        <ButtonComponent
          @click="changeSaleState('#saleCheck')"
          class="saleButton"
          id="buttonSale"
          msj="¡OFERTAS!"
        ></ButtonComponent>
      </span>
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
    console.log(this.authentication);
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
        /*
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "0";
        const pageBody = document.querySelector("body");
        pageBody.classList.add("bodyStyle");
        */
        document.getElementById("headerId").style.display = "none";
      }
      if (bool === false) {
        /*
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "1";
        const pageBody = document.querySelector("body");
        pageBody.classList.remove("bodyStyle");
        */
        document.getElementById("headerId").style.display = "flex";
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
  components: { LoadingSpinner, ButtonComponent },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

.saleButtonCheck {
  background-color: #5cbb5c;
  border: 1px solid #5cbb5c;
  color: white;
  transition: 0.4s;
}
.saleButton {
  background-color: #e92222;
  border: 1px solid #f34646;
  transition: 0.4s;
}
button:focus {
  background-color: blue;
}
.labelColorButton {
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
  margin: 10px;
  cursor: pointer;
  span {
    justify-content: center;
    align-items: center;
    position: absolute;
    display: flex;
    width: 50px;
    height: 50px;
    padding: 0;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background: #eeeeee;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    transition: ease 0.3s;
  }
  span:hover {
    padding: 10px;
  }
  input:checked + span {
    position: absolute;
    padding: 7px;

    top: 50%;
    left: 50%;
    border: 1px solid black;
  }
  input:checked + button {
    background-color: #e7e7e7;
  }
}
.secColor {
  @include fuenteSemiBold;
  @include flexInputDpNone;
}

.secTallas {
  @include fuenteSemiBold;
  @include flexInputDpNone;
}

.btnFiltrado {
  display: flex;
  margin: 0 auto;
  margin-top: 12rem;
  background-color: rgb(238, 237, 237);
  p {
    color: black;
  }
  border: 1px solid #e7e7e7;
}

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
.scrollBarHidden {
  ::-webkit-scrollbar {
    width: 0 !important;
  }
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
@include estiloMenuFiltro(
  "#FilterMenu__toggle",
  ".filterMenu__btn",
  ".filterMenu__box"
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
  .filterMenu__box {
    width: 31%;
  }
  #FilterMenu__toggle:checked ~ .filterMenu__box .greyContainer {
    left: 0% !important;
    width: 69%;
  }
}
@media (min-width: 600px) and (max-width: 899px) {
  .filterMenu__box {
    width: 50%;
  }

  #FilterMenu__toggle:checked ~ .filterMenu__box .greyContainer {
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

  .filterMenu__box {
    width: 100%;
  }
  .greyContainer {
    display: none;
  }
}
</style>
