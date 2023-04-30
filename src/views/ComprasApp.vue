<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <section v-if="carga" class="comprasMain">
    <ul class="orderUl">
      <li
        class="orderProduct"
        v-for="(item, index) in this.userOrders"
        :key="index"
      >
        <div class="orderDiv">
          <div class="imgContainer">
            <img :src="this.ordersImages[index].imagen" />
          </div>
          <div class="options">
            <section class="carrPSec1">
              <p>Nº {{ item.id }}</p>
              <p>21/03/2023</p>
              <p class="color">Pendiente de envío</p>
              <p href="#">Ver Detalles</p>
              <p>{{ item.products.length }} artículos</p>
            </section>
            <p class="orderPrice">{{ item.totalPrice }} €</p>
          </div>
        </div>

        <div
          v-if="index < this.userOrders.length - 1"
          class="separadorBlack"
        ></div>
      </li>
    </ul>
    <div class="userOrderMenu">
      <div class="cabeceraMenu">
        <h1 class="TopMenu__item textoGruesoh1">
          HOLA {{ userData.nombre.toUpperCase() }}
          {{ userData.apellidos.toUpperCase() }}
        </h1>
      </div>
      <div class="separadorBlack"></div>
      <div class="menuOptions">
        <ul>
          <li class="usOption">
            <h2>Mis Compras</h2>
            <img src="../assets/Caja.png" />
          </li>
          <li>
            <h2>Datos Personales</h2>
            <img src="../assets/huella.png" />
          </li>
          <li>
            <h2>Métodos de pago</h2>
            <img src="../assets/tarjeta.png" />
          </li>
          <li>
            <h2>Política de Privacidad</h2>
            <img src="../assets/alertaPng.png" />
          </li>
        </ul>
        <div class="separadorBlack"></div>

        <input
          @click="logOut"
          class="nextButtonSubmit"
          type="button"
          value="CERRAR SESIÓN"
        />
      </div>
    </div>
  </section>
  <section v-else>
    <LoadingSpinner></LoadingSpinner>
  </section>
</template>
<script>
import WhiteHeader from "@/components/WhiteHeader.vue";
import axios from "axios";
import { API_URL } from "@/helpers/basicHelpers";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
/*eslint-disable */
export default {
  async created() {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
    debugger;
    await this.getUserOrders();
    await this.getOrdersImages();
    console.log(this.ordersImages);
    console.log(this.userOrders);
    debugger;
    this.carga = true;
  },
  data() {
    return {
      userOrders: null,
      ordersImages: null,
      carga: false,
      userData: null,
    };
  },
  name: "ComprasApp",
  components: {
    WhiteHeader,
    LoadingSpinner,
  },
  methods: {
    async getUserOrders() {
      this.carga = false;
      const data = await axios
        .get(`${API_URL}users/email/${this.$store.state.currentMail}`)
        .then((res) => res.data)
        .catch((error) => error);
      this.userData = data;
      console.log(this.userData);
      debugger;
      const idUser = data.idUser;
      debugger;
      const getUserOrders = await axios
        .get(`${API_URL}orders/user/${idUser}`)
        .then((res) => res.data)
        .catch((error) => error);
      this.userOrders = getUserOrders;
    },
    async getOrdersImages() {
      this.carga = false;
      let imagesArr = [];
      for (let order of this.userOrders) {
        const data = await axios
          .get(`${API_URL}products/${order.products[0]}`)
          .then((res) => res.data)
          .catch((error) => error);
        imagesArr.push(data);
      }
      this.ordersImages = imagesArr;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
.userOrderMenu {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: #f9f9f9;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .cabeceraMenu {
    box-shadow: none;
  }
  .separadorBlack {
    width: 70%;
    margin: 0 auto;
    margin-top: 1.3rem;
    margin-bottom: 1.3rem;
  }
}
.menuOptions ul li h2 {
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  color: #949494;
  margin: 1rem;
}
.comprasMain {
  display: flex;
  min-height: 100vh;
}
.orderUl {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10rem;
  width: 70%;
}
.orderDiv {
  display: flex;
  align-items: center;
}

.separadorBlack {
  width: 100%;
  border: 0.1px solid #aca8a8;
}
.orderProduct {
  display: flex;
  align-items: center;
  flex-direction: column;

  .options {
    display: flex;
    padding-left: 1rem;
    .carrPSec1 {
      display: flex;
      flex-direction: column;
    }
    .orderPrice {
      padding-left: 12rem;
    }
    p {
      @include fuenteSemiBold;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
  }
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
}
</style>
