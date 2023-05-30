<template>
  <input
    @click="menuAction(true)"
    id="CarritoMenu__toggle"
    type="checkbox"
    name="checkBusqueda"
  />

  <label
    id="hideCartId"
    class="cartWithNumber headerHoverLabel"
    @click="menuAction(true)"
    for="checkBusqueda"
  >
    <div
      v-bind:class="color === 'Dark' ? 'carritoNumberDark' : 'carritoNumber'"
      v-if="this.carrito.cesta.length > 0"
    >
      <p>{{ this.cartLength }}</p>
    </div>
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
            v-if="this.carrito.cesta.length > 0 || this.carrito !== null"
            class="grupoFlex"
          >
            <img src="../assets/bolso.png" />
            <p>CARRITO ({{ this.cartLength }})</p>
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
          <p v-if="wishList.wishList.length > 0 || wishList !== null">
            WISHLIST ({{ wishList.wishList.length }})
          </p>
          <p v-else>WISHLIST (0)</p>
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
                <div class="optionContainer">
                  <span
                    class="spanHeight"
                    :style="{ backgroundColor: item.color.estilo }"
                  ></span>
                </div>
                <div class="optionContainer">
                  {{ item.talla }}
                </div>
                <div class="optionContainer">
                  <img
                    class="minusQuantity"
                    src="../assets/minus-sign.png"
                    @click="this.modifyCantity('delete', index)"
                  />
                  {{ item.cantidad }}
                  <p @click="this.modifyCantity('add', index)">+</p>
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
            @click="this.tramitarPedido()"
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
          <p v-if="this.carrito.cesta.length > 0 || carrito !== null">
            CARRITO ({{ carrito.cesta.length }})
          </p>
          <p v-else>CARRITO(0)</p>
        </label>
        <input type="checkbox" name="likeCheck" id="likeCheck" />

        <label class="labelCarrito" for="likeCheck">
          <div
            v-if="wishList.wishList.length > 0 || wishList !== null"
            class="grupoFlex"
          >
            <img src="../assets/likeWhite.png" />
            <p>WISHLIST ({{ wishList.wishList.length }})</p>
          </div>
          <div v-else class="grupoFlex">
            <img src="../assets/likeWhite.png" />
            <p>WISHLIST (0)</p>
          </div>
          <div class="marcador"></div>
        </label>
        <div class="closeDiv" @click="menuAction(false)">
          <img :src="this.deleteIcon" />
        </div>
      </div>
      <div
        v-if="wishList.wishList.length > 0 && wishList !== null"
        class="contenidoCarrito"
      >
        <div v-if="!carga">
          <LoadingSpinner></LoadingSpinner>
        </div>
        <div v-else>
          <div
            class="cartProduct"
            v-for="(item, index) in this.wishList.wishList"
            :key="index"
          >
            <div class="imgContainer">
              <img :src="this.wishListData[index].imagen" />
            </div>
            <div class="options">
              <section class="carrPSec1">
                <p>
                  {{ this.wishListData[index].nombre }}
                </p>
                <img
                  @click="this.deleteItem(index)"
                  src="../assets/trash-can.png"
                />
              </section>
            </div>
          </div>

          <ButtonComponent
            class="colorBoton mgBottom"
            msj="VER MAS PRODUCTOS"
          ></ButtonComponent>
        </div>
      </div>
      <div v-else class="contenidoCarrito">
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

  beforeCreate() {
    const carrito = localStorage.getItem("userProducts");
    const wishList = localStorage.getItem("userLikes");
    if (carrito === null) {
      localStorage.setItem("userProducts", JSON.stringify({ cesta: [] }));
      this.$store.commit(
        "setCurrentCart",
        JSON.parse(localStorage.getItem("userProducts"))
      );
    }
    if (wishList === null) {
      localStorage.setItem("userLikes", JSON.stringify({ wishList: [] }));
      this.$store.commit(
        "setCurrentWishList",
        JSON.parse(localStorage.getItem("userLikes"))
      );
    }
  },
  async created() {
    if (this.color === "Dark") {
      this.modo = this.bolsoOscuro;
      this.deleteIcon = this.deleteOscuro;
    } else {
      this.modo = this.bolsoClaro;
      this.deleteIcon = this.deleteClaro;
    }
    if (this.$store.state.currentToken === null) {
      await this.getToken();
    }
    await this.getToken();

    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.token}`,
    };

    if (this.carrito === null || this.wishList === null) {
      if (this.carrito === null) {
        this.$store.commit(
          "setCurrentCart",
          JSON.parse(localStorage.getItem("userProducts"))
        );
        if (this.$store.state.currentCart === null) {
          localStorage.setItem("userProducts", JSON.stringify({ cesta: [] }));
        }
      }
      if (this.wishList === null) {
        this.$store.commit(
          "setCurrentWishList",
          JSON.parse(localStorage.getItem("userLikes"))
        );
        if (this.$store.state.currentWishList === null) {
          localStorage.setItem("userLikes", JSON.stringify({ wishList: [] }));
        }
      }
      this.cartLength = this.cartQuantity();
    } else {
      this.cartLength = this.cartQuantity();

      this.carga = false;
      if (this.carrito.cesta.length > 0) {
        let dataArr = [];
        for (let objeto of this.carrito.cesta) {
          const prodData = await this.getProductData(objeto.productName);
          dataArr.push(prodData);
        }
        this.productsData = dataArr;
      }

      if (this.wishList.wishList.length > 0) {
        this.carga = false;
        let wishListArr = [];

        for (let name of this.wishList.wishList) {
          const wishListItemData = await this.getProductData(name);
          wishListArr.push(wishListItemData);
        }
        this.wishListData = wishListArr;
      }
      this.carga = true;
    }

    this.checked = "#cartCheck";
  },
  mounted() {
    this.toggleTab(this.checked);
  },
  name: "CarritoMenu",
  props: {
    color: String,
    authentication: Boolean,
  },
  methods: {
    cartQuantity() {
      let cantidad = 0;
      this.carrito.cesta.forEach((prod) => {
        cantidad += prod.cantidad;
      });
      return cantidad;
    },
    modifyCantity(operation, itemIndex) {
      const cantidad = this.carrito.cesta[itemIndex].cantidad;
      if (operation === "delete") {
        if (cantidad > 1) {
          this.carrito.cesta[itemIndex].cantidad -= 1;
          localStorage.setItem("userProducts", JSON.stringify(this.carrito));
        }
        return;
      }
      if (operation === "add") {
        this.carrito.cesta[itemIndex].cantidad += 1;
        localStorage.setItem("userProducts", JSON.stringify(this.carrito));
      }
    },
    tramitarPedido() {
      if (this.authentication === false) {
        this.$router.push("/cartLogin");
      } else {
        this.$router.push("/pago");
      }
    },
    async getToken() {
      const data = await axios
        .post(
          `${API_URL}token`,
          {},
          {
            auth: {
              username: "holajavi@gmail.com",
              password: "suspenso_01",
            },
          }
        )
        .then((res) => {
          this.token = res.data;
          this.$store.commit("setCurrentToken", res.data);
        });
    },
    deleteItem(index) {
      this.carrito.cesta.splice(index, 1);
      localStorage.setItem("userProducts", JSON.stringify(this.carrito));
      this.$store.commit("setCurrentCart", this.carrito);
    },
    calcularPrecioCarrito() {
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
    },
    toggleTab(selectorName) {
      if (selectorName === "#cartCheck") {
        document.querySelector(selectorName).checked = true;
        this.checked = true;
        document.querySelector("#likeCheck").checked = false;
        //document.querySelector("label[for=likeCheck]").className =
        ("labelUnchecked");
      } else if (selectorName === "#likeCheck") {
        /*document.querySelector("label[for=likeCheck]").className =
                  "labelCarrito";*/
        document.querySelector(selectorName).checked = true;
        this.checked = false;

        document.querySelector("#cartCheck").checked = false;
        /*document.querySelector("label[for=cartCheck]").className =
                  "labelUnchecked";*/
      }
    },
  },
  data() {
    return {
      carrito: this.$store.state.currentCart,
      wishList: this.$store.state.currentWishList,
      modo: null,
      deleteIcon: null,
      checked: null,
      selected: null,
      bolsoClaro: require("../assets/bolsoBlanco.png"),
      bolsoOscuro: require("../assets/bolso.png"),
      deleteClaro: require("../assets/DeleteIcon.png"),
      deleteOscuro: require("../assets/DeleteIcon.png"),
      productsData: null,
      wishListData: null,
      carga: false,
      isOpened: false,
      token: null,
      cartLength: null,
    };
  },
  watch: {
    authentication: function (newVal, oldVal) {
      if (newVal === true) {
      }
    },
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
        this.cartLength = this.cartQuantity();
        this.productsData = dataArr;
        this.carga = true;
      },
    },
    "$store.state.currentWishList": {
      deep: true,
      async handler(newVal) {
        this.carga = false;
        this.wishList = newVal;
        let dataArr = [];
        for (let name of this.wishList.wishList) {
          const prodData = await this.getProductData(name);
          dataArr.push(prodData);
        }
        this.wishListData = dataArr;
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
<style lang="scss">
@import "../helpers/mixings.scss";

@include headerIconHover;
@import "../styles/layout/CarritoMenu.scss";
</style>
