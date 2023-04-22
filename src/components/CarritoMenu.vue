<template>
  <input
    @click="menuAction(true)"
    id="CarritoMenu__toggle"
    type="checkbox"
    name="checkBusqueda"
  />

  <label class="headerHoverLabel" @click="menuAction(true)" for="checkBusqueda">
    <img class="headerHoverLabel" :src="this.modo" />
  </label>

  <ul class="CarritoMenu__box">
    <div v-if="checked">
      <div class="cabeceraMenu">
        <input type="checkbox" name="cartCheck" id="cartCheck" />

        <label
          @click="toggleTab('#cartCheck')"
          class="labelCarrito"
          for="cartCheck"
        >
          <div
            v-if="carrito.cesta.length > 0 || carrito !== null"
            class="grupoFlex"
          >
            <img src="../assets/bolso.png" />
            <p>CARRITO ({{ carrito.cesta.length }})</p>
          </div>

          <div v-else class="grupoFlex">
            <img src="../assets/bolso.png" />
            <p>CARRITO (0)</p>
          </div>

          <div class="marcador"></div>
        </label>
        <input type="checkbox" name="likeCheck" id="likeCheck" />

        <label
          @click="toggleTab('#likeCheck')"
          class="labelUnchecked"
          for="likeCheck"
        >
          <img src="../assets/likeWhite.png" />
          <p>WISHLIST (0)</p>
        </label>
        <div class="closeDiv" @click="menuAction(false)">
          <img :src="this.deleteIcon" />
        </div>
      </div>

      <div
        v-if="carrito.cesta.length > 0 && carrito !== null"
        class="contenidoCarrito"
      >
        <div v-if="!carga">
          <LoadingSpinner></LoadingSpinner>
        </div>
        <div v-else>
          <div
            class="cartProduct"
            v-for="(item, index) in this.carrito.cesta"
            :key="index"
          >
            <div class="imgContainer">
              <img :src="this.productsData[index].imagen" />
            </div>
            <div class="options">
              <section class="carrPSec1">
                <p>
                  {{ item.productName }}
                </p>
                <img
                  @click="this.deleteItem(index)"
                  src="../assets/trash-can.png"
                />
              </section>
              <section class="prodOptions">
                <div class="optionContainer"></div>
                <div class="optionContainer">
                  {{ item.talla }}
                </div>
                <div class="optionContainer">
                  {{ item.cantidad }}
                </div>
              </section>
              <section class="precioProd">
                <p class="precio" v-if="this.productsData[index].oferta">
                  {{
                    applySale(
                      this.productsData[index].precio,
                      this.productsData[index].oferta
                    ) * item.cantidad
                  }}
                  €
                </p>
                <p class="precio" v-else>
                  {{ this.productsData[index].precio * item.cantidad }} €
                </p>
              </section>
            </div>
          </div>
          <section class="totalPrice">
            <div class="total">
              <p>TOTAL</p>
              <p>{{ this.calcularPrecioCarrito() }} €</p>
            </div>
            <p class="precio">Envío Incluido</p>
          </section>
          <ButtonComponent
            class="colorBoton mgBottom"
            msj="TRAMITAR PEDIDO"
          ></ButtonComponent>
        </div>
      </div>
      <div v-else class="contenidoCarrito">
        <p class="textoP">TU CESTA ESTA VACÍA</p>
        <button @click="seeProducts()" class="seeProductsButton">
          VER PRODUCTOS
        </button>
      </div>
    </div>
    <div v-else-if="!checked">
      <div class="cabeceraMenu">
        <input type="checkbox" name="cartCheck" id="cartCheck" />

        <label
          @click="toggleTab('#cartCheck')"
          class="labelUnchecked"
          for="cartCheck"
        >
          <img src="../assets/bolso.png" />
          <p>CARRITO (0)</p>
        </label>
        <input type="checkbox" name="likeCheck" id="likeCheck" />

        <label class="labelCarrito" for="likeCheck">
          <div class="grupoFlex">
            <img src="../assets/likeWhite.png" />
            <p>WISHLIST (0)</p>
          </div>
          <div class="marcador"></div>
        </label>
        <div class="closeDiv" @click="menuAction(false)">
          <img :src="this.deleteIcon" />
        </div>
      </div>
      <div class="contenidoCarrito">
        <p class="textoP">TU WISHLIST ESTA VACÍA</p>
        <button @click="seeProducts()" class="seeProductsButton">
          VER PRODUCTOS
        </button>
      </div>
    </div>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
</template>
<script>
import axios from "axios";
import { API_URL } from "@/helpers/basicHelpers";
import LoadingSpinner from "./LoadingSpinner.vue";
import ButtonComponent from "./ButtonComponent.vue";
export default {
  /*eslint-disable */
  async created() {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
    if (this.carrito === null) {
      this.$store.commit(
        "setCurrentCart",
        JSON.parse(localStorage.getItem("userProducts"))
      );
    } else {
      debugger;
      if (this.carrito.cesta.length > 0) {
        this.carga = false;
        let dataArr = [];
        for (let objeto of this.carrito.cesta) {
          const prodData = await this.getProductData(objeto.productName);
          dataArr.push(prodData);
        }
        this.productsData = dataArr;
        this.carga = true;
      }
    }
    debugger;
    console.log(this.carrito);
    if (this.color === "Dark") {
      this.modo = this.bolsoOscuro;
      this.deleteIcon = this.deleteOscuro;
    } else {
      this.modo = this.bolsoClaro;
      this.deleteIcon = this.deleteClaro;
    }
    this.checked = "#cartCheck";
  },
  mounted() {
    this.toggleTab(this.checked);
    console.log(this.carrito);
  },
  name: "CarritoMenu",
  props: {
    color: String,
  },
  methods: {
    deleteItem(index) {
      debugger;
      this.carrito.cesta.splice(index, 1);
      this.$store.commit("setCurrentCart", this.carrito);
    },
    calcularPrecioCarrito() {
      debugger;
      let price = 0;
      for (let i = 0; i < this.carrito.cesta.length; i++) {
        if (this.productsData[i].oferta !== null) {
          price +=
            this.applySale(
              this.productsData[i].precio,
              this.productsData[i].oferta
            ) * this.carrito.cesta[i].cantidad;
        } else {
          price += this.productsData[i].precio * this.carrito.cesta[i].cantidad;
        }
      }
      return price;
    },
    applySale(precio, porcentaje) {
      const resultado = Math.round(precio - (precio * porcentaje) / 100);
      return resultado;
    },
    async getProductData(id) {
      console.log(id);
      this.carga = false;
      const data = await axios
        .get(`${API_URL}products/nombre/${id}`)
        .then((res) => (this.datosProduct = res.data));
      return data;
    },
    seeProducts() {
      this.$router.push("/products");
    },
    menuAction(bool) {
      const pageBody = document.querySelector("body");
      document.querySelector("#CarritoMenu__toggle").checked = bool;
      if (bool === true) {
        this.isOpened = true;

        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "0";
        pageBody.classList.add("bodyStyle");
      }
      if (bool === false) {
        this.isOpened = false;

        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "1";
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
    toggleTab(selectorName) {
      if (selectorName === "#cartCheck") {
        //document.querySelector("Checked").className = "labelCarrito";
        console.log(document.querySelector(selectorName));
        document.querySelector(selectorName).checked = true;
        this.checked = true;
        console.log(this.checked);
        document.querySelector("#likeCheck").checked = false;
        //document.querySelector("label[for=likeCheck]").className =
        ("labelUnchecked");
      } else if (selectorName === "#likeCheck") {
        /*document.querySelector("label[for=likeCheck]").className =
                  "labelCarrito";*/
        console.log(document.querySelector(selectorName));
        document.querySelector(selectorName).checked = true;
        this.checked = false;

        console.log(this.checked);
        document.querySelector("#cartCheck").checked = false;
        /*document.querySelector("label[for=cartCheck]").className =
                  "labelUnchecked";*/
      }
    },
  },
  data() {
    return {
      carrito: this.$store.state.currentCart,
      modo: null,
      deleteIcon: null,
      checked: null,
      selected: null,
      bolsoClaro: require("../assets/bolsoBlanco.png"),
      bolsoOscuro: require("../assets/bolso.png"),
      deleteClaro: require("../assets/DeleteIcon.png"),
      deleteOscuro: require("../assets/DeleteIcon.png"),
      productsData: null,
      carga: false,
      isOpened: false,
    };
  },
  watch: {
    "$store.state.currentCart": {
      //Para añadir reactividad al carrito debemos escuchar el objeto store
      deep: true,
      async handler(newVal) {
        this.carga = false;
        this.carrito = newVal;
        let dataArr = [];
        for (let objeto of this.carrito.cesta) {
          const prodData = await this.getProductData(objeto.productName);
          dataArr.push(prodData);
        }
        this.productsData = dataArr;
        this.carga = true;
      },
    },
    isOpened: function (newVal, oldVal) {
      this.$store.commit("setCurrentFilterMenu", newVal);
    },
  },
  components: { LoadingSpinner, ButtonComponent },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";

@include headerIconHover;
.colorBoton {
  @include loginButton("green", "white", "2rem");
  height: 1rem;
  width: 15rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.1s;
}
.colorBoton:hover {
  transform: scale(1.1);
}
.totalPrice {
  .total {
    @include fuenteBold;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
  }
  .precio {
    @include fuenteSemiBold;
    color: #95a3a4;
    font-size: 1.1rem;
    padding-top: 0.5rem;
    display: flex;
    padding-bottom: 0.5rem;
  }
}
.mgBottom {
  margin-bottom: 2rem;
  display: flex;
  margin: 0 auto;
  margin-top: 2rem;
  position: relative;
  top: -1rem;
}

.cartProduct {
  display: flex;
  position: relative;
  right: 3rem;
  align-items: center;
  .imgContainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    width: 140px;
    height: 200px;
    background-color: beige;
    border-radius: 18px;
    margin: 2rem 1.2rem 2rem;
    cursor: pointer;
    img {
      width: 10rem;
      height: 6rem;
    }
  }
  .options {
    display: flex;
    flex-direction: column;
    .carrPSec1 {
      display: flex;
      p {
        @include fuenteSemiBold;
      }
      img {
        position: absolute;
        right: -4rem;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    .prodOptions {
      display: flex;
      //flex-wrap: wrap;
      padding-top: 3em;
      padding-bottom: 3rem;
      .optionContainer {
        @include fuenteSemiBold;
        height: 1.5rem;
        box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.2);
        width: 5rem;
        border: 1.8px solid black;
        margin: 0.2rem;
      }
    }
    .precioProd {
      @include fuenteSemiBold;
      .precio {
        position: absolute;
        right: -4rem;
        height: 1.5rem;
      }
    }
  }
}

@media (min-width: 1175px) and (max-width: 1600px) {
  .cartProduct {
    right: 0.5rem;
    .options {
      .carrPSec1 {
        img {
          right: -1rem;
        }
      }
      .precioProd {
        .precio {
          right: -1rem;
        }
      }
    }
  }
}
@media (min-width: 755px) and (max-width: 1174px) {
  .cartProduct {
    right: 0.5rem;
    .options {
      .carrPSec1 {
        p {
          width: 58%;
        }
        img {
          right: -1rem;
        }
      }
      .prodOptions {
        flex-wrap: wrap;
        padding-top: 1em;
        padding-bottom: 0.3rem;
      }
      .precioProd {
        .precio {
          right: -1rem;
        }
      }
    }
  }
}

.grupoFlex {
  flex-direction: row;
}
.marcador {
  width: 115%;
  height: 1px;
  border: 1px solid black;
  background-color: black;
  position: absolute;
  bottom: 0;
}
.cabeceraMenu {
  display: flex;
  width: 100%;
  align-items: center;
  img {
    width: 2rem;
    height: 2rem;
    position: relative;
    left: 10%;
    bottom: 1%;
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.28);
}
.textoP {
  font-size: 2rem;
  @include fuenteSemiBold;
}
#checkedBusqueda {
  display: none;
}
.searchMenu {
  cursor: pointer;
}
.seeProductsButton {
  padding-top: 5rem;
  margin-top: 2rem;
  width: 18rem;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  font-size: 1.4rem;
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  margin-top: 5rem;
  margin-bottom: 1rem;
}
.bodyStyle {
  overflow: hidden;
}
@include carritoMenuDerecho(
  "#CarritoMenu__toggle",
  ".menu__btn",
  ".CarritoMenu__box"
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
#cartCheck,
#likeCheck {
  z-index: 1;
  width: 1rem;
  position: relative;
  right: -1rem;
  opacity: 0;
  label {
    background-color: grey;
  }
}
.contenidoCarrito {
  display: flex;
  padding-top: 5rem;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80%;

  label {
    width: 60%;
    text-align: left;
  }
}
.labelUnchecked {
  width: 40%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #95a3a4;
  border: 2px solid black;
  opacity: 0.6;
  img {
    padding-right: 2rem;
  }
  @include fuenteSemiBold;
}
.labelCarrito {
  position: relative;
  width: 40%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  img {
    padding-right: 2rem;
  }
  @include fuenteSemiBold;
}
.closeDiv {
  display: flex;
  width: 20%;
  justify-content: center;
}
@media (min-width: 900px) and (max-width: 1430px) {
  .menu__box {
    width: 31%;
  }
  #menu__toggle:checked ~ .CarritoMenu__box .greyContainer {
    left: 31% !important;
  }
}
@media (min-width: 600px) and (max-width: 899px) {
  .CarritoMenu__box {
    width: 50%;
  }

  #CarritoMenu__toggle:checked ~ .CarritoMenu__box .greyContainer {
    left: -10% !important;
  }
}

@media (max-width: 754px) {
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

  .CarritoMenu__box {
    width: 100%;
  }
  .greyContainer {
    display: none;
  }
}
</style>
