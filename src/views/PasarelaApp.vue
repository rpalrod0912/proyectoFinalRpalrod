<template>
  <WhiteHeader class="headerPasarela" tipo="Dark"></WhiteHeader>
  <div class="pasarelaMain">
    <section class="pasarelaOptions">
      <h1>DETALLES DEL PEDIDO</h1>
      <ul class="options">
        <li>
          <h1>Envío Standard</h1>
        </li>
        <li>
          <h1>Método de Pago</h1>
        </li>
        <li>
          <h1>Datos del Regalo</h1>
        </li>
        <ButtonComponent
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
    };
  },
  async created() {
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
        for (let objeto of this.carrito.cesta) {
          const prodData = await this.getProductData(objeto.productName);
          dataArr.push(prodData);
        }
        this.productsData = dataArr;
      }

      this.carga = true;
    }
  },
  methods: {
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
.headerPasarela {
  display: none;
}
.pasarelaOptions {
  @include fuenteSemiBold;
  ul {
    li {
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
  h1 {
    display: flex;
    justify-content: center;
  }
  .cartProduct {
    right: 0rem;
  }
  .options {
    img,
    p {
      right: 0rem;
    }
    .precioProd {
      .precio {
        right: 0rem;
      }
    }
    right: 0rem;
    .prodOptions {
      .optionContainer {
        display: flex;
        justify-content: center;
      }
    }
  }
}
.options {
  //width: 72%;
}
</style>
