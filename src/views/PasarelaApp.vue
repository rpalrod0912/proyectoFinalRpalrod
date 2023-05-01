<template>
  <WhiteHeader class="headerPasarela" tipo="backHeader"></WhiteHeader>
  <div class="pasarelaMain">
    <section class="pasarelaOptions">
      <h1>DETALLES DEL PEDIDO</h1>
      <ul class="options">
        <li class="optionBox">
          <img src="../assets/delivery.png" />
          <h1>Envío Standard</h1>
        </li>
        <li class="optionBox">
          <img src="../assets/tarjeta.png" />
          <h1>Método de Pago</h1>
        </li>
        <li class="optionBox">
          <img src="../assets/gift.png" />
          <h1>Datos del Regalo</h1>
        </li>
        <ButtonComponent
          async
          @click="this.tramitarPedido()"
          class="colorBoton mgBottom"
          msj="TRAMITAR PEDIDO"
        ></ButtonComponent>
      </ul>
    </section>
    <div class="cartInfo">
      <h1>TU CARRITO</h1>
      <div v-if="!carga">
        <LoadingSpinner></LoadingSpinner>
      </div>
      <div class="cartInfoProducts" v-else>
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
      </div>
    </div>
    <div class="bottomMenu">
      <input
        @click="menuAction(true)"
        id="bottomMenu__toggle"
        type="checkbox"
        name="checkBusqueda"
      />
      <label
        class="headerHoverLabel"
        @click="menuAction(true)"
        for="checkBusqueda"
      >
        <img
          @click="menuAction(true)"
          class="openIcon headerHoverLabel"
          src="../assets/upIcon.png"
        />
      </label>
      <div class="bottomMenu__box cartInfoProducts" v-if="carga">
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
      </div>
      <div v-else>
        <LoadingSpinner></LoadingSpinner>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable */
import ButtonComponent from "@/components/ButtonComponent.vue";
import WhiteHeader from "@/components/WhiteHeader.vue";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { API_URL } from "@/helpers/basicHelpers";
export default {
  name: "PasarelaApp",
  components: { WhiteHeader, LoadingSpinner, ButtonComponent },
  data() {
    return {
      carga: false,
      carrito: this.$store.state.currentCart,
      productsData: null,
      productsId: null,
      producstQuantity: null,
    };
  },
  async created() {
    if (document.querySelector("body").classList.contains("bodyStyle")) {
      document.querySelector("body").classList.toggle("bodyStyle");
    }
    if (this.$store.state.currentToken === null) {
      await this.getToken();
    }
    debugger;
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };

    if (this.carrito === null) {
      this.$store.commit(
        "setCurrentCart",
        JSON.parse(localStorage.getItem("userProducts"))
      );
      if (this.$store.state.currentCart === null) {
        localStorage.setItem("userProducts", JSON.stringify({ cesta: [] }));
      }
    } else {
      debugger;
      this.carga = false;
      if (this.carrito.cesta.length > 0) {
        let dataArr = [];
        let productsId = [];
        let producstQuantity = [];
        for (let objeto of this.carrito.cesta) {
          const prodData = await this.getProductData(objeto.productName);
          dataArr.push(prodData);
          productsId.push(prodData.idProduct);
          producstQuantity.push(objeto.cantidad);
        }
        this.productsData = dataArr;
        this.productsId = productsId;
        this.producstQuantity = producstQuantity;
      }

      this.carga = true;
    }
  },
  methods: {
    menuAction(bool) {
      document.querySelector("#bottomMenu__toggle").checked = bool;
      if (bool === true) {
        //document.getElementById("headerId").style.display = "none";
      }
      if (bool === false) {
        //document.getElementById("headerId").style.display = "flex";
      }
      console.log("estilos");
    },
    async tramitarPedido() {
      console.log("TRAMITADO");
      const data = await axios
        .get(`${API_URL}users/email/${this.$store.state.currentMail}`)
        .then((res) => res.data)
        .catch((error) => error);
      const orderDto = {
        userid: data.idUser,
        products: this.productsId,
        quantity: this.producstQuantity,
      };
      debugger;
      console.log(orderDto);
      const postOrder = await axios
        .post(`${API_URL}orders`, orderDto)
        .then((res) => console.log(res));
      console.log(data.idUser);
    },

    applySale(precio, porcentaje) {
      const resultado = Math.round(precio - (precio * porcentaje) / 100);
      return resultado;
    },
    async getToken() {
      const data = await axios
        .post(
          "http://localhost:8080/token",
          {},
          {
            auth: {
              username: "holajavi@gmail.com",
              password: "suspenso_01",
            },
          }
        )
        .then((res) => {
          debugger;
          this.$store.commit("setCurrentToken", res.data);
        });
    },
    async getProductData(id) {
      console.log(id);
      this.carga = false;
      const data = await axios
        .get(`${API_URL}products/nombre/${id}`)
        .then((res) => (this.datosProduct = res.data));
      return data;
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
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";

@include estiloMenuCompra(
  "#bottomMenu__toggle",
  ".menu__btn",
  ".bottomMenu__box"
);
.bottomMenu {
  position: fixed;
  bottom: 0rem;
  width: 100%;
  height: 5rem;
  /* background-color: black; */
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  .openIcon {
    width: 2rem;
  }
}
.pasarelaOptions {
  @include fuenteSemiBold;
  ul {
    li {
      @include fuenteRegular;
      display: flex;
      img {
        width: 2.5rem;
      }
      padding: 2rem;
      margin: 1rem;
      width: 30rem;
      align-items: center;
      justify-content: center;
      border: 1px solid #dadada;
      border-radius: 10px;
      list-style: none;
    }
  }
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: center;
  list-style: none;
}
.pasarelaMain {
  display: flex;
  min-height: 100vh;
}

.cartInfo {
  @include fuenteSemiBold;
  background-color: #f9f9f9;
  width: 30%;
  height: 100%;
  overflow: scroll;
  position: fixed;
  right: 0rem;
  cartInfoProducts {
    overflow: scroll;
  }
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  h1 {
    display: flex;
    justify-content: center;
  }
  .optionBox {
  }
  .cartProduct {
    right: 0rem;
  }
  .options {
    img,
    p {
      right: 1rem;
    }
    .precioProd {
      .precio {
        right: 1rem;
      }
    }
    right: 0rem;
    .prodOptions {
      flex-wrap: wrap;

      .optionContainer {
        display: flex;
        justify-content: center;
      }
    }
  }
}
@media (min-width: 843px) and (max-width: 1123px) {
  .pasarelaOptions {
    width: 60%;
    ul {
      li {
        width: 83%;
      }
    }
  }
  .cartInfo {
    width: 40%;
  }
}

@media (min-width: 844px) {
  .bottomMenu {
    display: none;
  }
}

@media (max-width: 843px) {
  .pasarelaOptions {
    width: 100%;
  }
  .cartInfo {
    display: none;
  }
}
.options {
  //width: 72%;
}
</style>
