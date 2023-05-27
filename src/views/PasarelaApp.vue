<template>
  <WhiteHeader class="headerPasarela" tipo="backHeader"></WhiteHeader>
  <PopUpModal
    @ventanaError="setPopValue"
    v-if="this.postError"
    :is-opened="this.postError"
    :isError="true"
    msj="Los Datos de Facturación deben estar rellenos "
  ></PopUpModal>
  <PopUpModal
    @ventanaError="setPedidoProcesado"
    v-if="pedidoProcesado"
    :is-opened="true"
    msj="¡GRACIAS, TU PEDIDO SE ESTA PROCESANDO CORRECTAMENTE!"
  ></PopUpModal>
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
        <li v-if="!this.orderData && this.loadData">
          <UserInformation
            :userData="this.userData"
            @updateWindow="reloadWindowIfTrue"
          ></UserInformation>
        </li>
        <li class="directionData" v-if="this.orderData && !this.loadData">
          <h1>Dirección del envío</h1>
          <div class="parentInfoContainer">
            <div class="infoContainer">
              <p class="boldP">Nombre:</p>
              <p>{{ this.userData.nombre }}</p>
            </div>
            <div class="infoContainer">
              <p class="boldP">Apellidos:</p>
              <p>{{ this.userData.apellidos }}</p>
            </div>
            <div class="infoContainer">
              <p class="boldP">Provincia:</p>
              <p>{{ this.userData.provincia }}</p>
            </div>
            <div class="infoContainer">
              <p class="boldP">CodigoPostal:</p>
              <p>{{ this.userData.cp }}</p>
            </div>
            <div class="infoContainer">
              <p class="boldP">Ciudad:</p>
              <p>{{ this.userData.ciudad }}</p>
            </div>
            <p class="boldP">Dirección del domicilio:</p>
            <p>{{ this.userData.direccion }}</p>
          </div>
        </li>
        <ButtonComponent
          async
          @click="this.tramitarPedido()"
          class="colorBoton mgBottom"
          msj="TRAMITAR PEDIDO"
        ></ButtonComponent>
      </ul>
    </section>
    <div class="cartInfo" v-if="this.carga">
      <h1>TU CARRITO</h1>

      <div class="cartInfoProducts">
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
      <div v-if="!this.carga">
        <LoadingSpinner></LoadingSpinner>
      </div>
    </div>
    <div v-else class="cartInfo">
      <LoadingSpinner></LoadingSpinner>
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
      <div class="cartImg" v-if="this.carga">
        <div v-for="(item, index) in this.carrito.cesta" :key="index">
          <img :src="this.productsData[index].imagen" />
        </div>
      </div>
      <div class="bottomMenu__box cartInfoProducts" v-if="this.carga">
        <div class="fixedCabecera">
          <div class="cabecera">
            <h1>TU CARRITO</h1>
            <img
              @click="menuAction(false)"
              class="closeIcon"
              src="../assets/upIcon.png"
            />
          </div>
        </div>
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
import UserInformation from "@/components/UserInformation.vue";
import PopUpModal from "@/components/popUpModal.vue";
export default {
  name: "PasarelaApp",
  components: {
    WhiteHeader,
    LoadingSpinner,
    ButtonComponent,
    UserInformation,
    PopUpModal,
  },
  data() {
    return {
      carga: false,
      carrito: this.$store.state.currentCart,
      productsData: null,
      productsId: null,
      producstQuantity: null,
      userData: null,
      orderData: null,
      loadData: null,
      pedidoProcesado: null,
      postError: null,
    };
  },
  async created() {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
    if (document.querySelector("body").classList.contains("bodyStyle")) {
      document.querySelector("body").classList.toggle("bodyStyle");
    }
    if (this.$store.state.currentToken === null) {
      await this.getToken();
    }
    debugger;
    this.userData = await this.fetchUserData();
    if (
      this.userData.cp === null ||
      this.userData.direccion === null ||
      this.userData.fechaNac === null ||
      this.userData.ciudad === null ||
      this.userData.provincia === null
    ) {
      this.orderData = false;
    } else {
      this.orderData = true;
    }
    debugger;
    console.log(this.carga);
    console.log(this.userData);
    debugger;
    if (this.carrito === null) {
      debugger;
      this.$store.commit(
        "setCurrentCart",
        JSON.parse(localStorage.getItem("userProducts"))
      );
      if (this.$store.state.currentCart === null) {
        localStorage.setItem("userProducts", JSON.stringify({ cesta: [] }));
      }
    } else {
      this.carga = false;

      if (this.carrito.cesta.length > 0) {
        debugger;
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
      if (!this.orderData) {
        this.loadData = true;
      } else {
        this.loadData = false;
      }
    }
  },
  methods: {
    setPopValue(val) {
      this.postError = val;
    },
    setPedidoProcesado(val) {
      this.pedidoProcesado = val;
    },
    reloadWindowIfTrue() {
      this.$router.go();
    },
    async fetchUserData() {
      debugger;
      const data = await axios
        .get(`${API_URL}users/email/${this.$store.state.currentMail}`)
        .then((res) => res.data)
        .catch((error) => error);
      return data;
    },
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
      if (
        this.userData.cp === null ||
        this.userData.direccion === null ||
        this.userData.fechaNac === null ||
        this.userData.ciudad === null ||
        this.userData.provincia === null
      ) {
        this.postError = true;
      } else {
        const orderDto = {
          userid: this.userData.idUser,
          products: this.productsId,
          quantity: this.producstQuantity,
        };
        console.log(orderDto);
        const postOrder = await axios
          .post(`${API_URL}orders`, orderDto)
          .then((res) => console.log(res));
        this.pedidoProcesado = true;
        setInterval(() => {
          this.$router
            .push({
              name: "Inicio",
            })
            .then(() => {
              this.$router.go();
            });
        }, 2000);
      }
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
<style lang="scss">
@import "../helpers/mixings.scss";
@import "../styles/views/PasarelaApp.scss";

@include inputTypeSubmit;
.putDataSubmit {
  width: 60%;
}
</style>
