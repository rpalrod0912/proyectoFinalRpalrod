<template>
  <WhiteHeader class="headerPasarela" tipo="backHeader"></WhiteHeader>
  <section v-if="carga" class="comprasMain">
    <div v-if="this.userOrders.length > 0" class="orderUl">
      <div
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
      </div>
    </div>
    <div class="orderUl" v-else>
      <h1>TODAVÍA NO TIENES NINGÚN PEDIDO</h1>
    </div>
    <RightDesktopMenu
      selectedOption="firstOption"
      :userData="this.userData"
    ></RightDesktopMenu>
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
import RightDesktopMenu from "@/components/RightDesktopMenu.vue";
/*eslint-disable */
export default {
  async created() {
    if (document.querySelector("body").classList.contains("bodyStyle")) {
      document.querySelector("body").classList.toggle("bodyStyle");
    }
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
    await this.getUserOrders();
    await this.getOrdersImages();
    console.log(this.ordersImages);
    console.log(this.userOrders);
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
    RightDesktopMenu,
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
      const idUser = data.idUser;
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
@import "../styles/views/ComprasApp.scss";
</style>
