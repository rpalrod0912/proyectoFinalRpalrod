<template>
  <WhiteHeader class="headerPasarela" tipo="backHeader"></WhiteHeader>
  <section v-if="carga" class="comprasMain">
    <ul v-if="this.userOrders.length > 0" class="orderUl">
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
    <ul class="orderUl" v-else>
      <h1>TODAVÍA NO TIENES NINGÚN PEDIDO</h1>
    </ul>
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

.orderUl {
  h1 {
    @include fuenteSemiBold;
  }
}

@media (min-width: 900px) and (max-width: 1400px) {
  .comprasMain {
    .orderUl {
      width: 60%;
      .orderProduct .options .orderPrice {
        padding-left: 8rem;
      }
    }
  }
}

@media (min-width: 686px) and (max-width: 899px) {
  .comprasMain {
    .orderUl {
      width: 100%;
    }
  }
}

@media (min-width: 580px) and (max-width: 685px) {
  .comprasMain {
    justify-content: center;
    .orderUl {
      width: 80%;
      .orderProduct .options .orderPrice {
        padding-left: 4rem;
      }
    }
  }
}

@media (max-width: 579px) {
  .comprasMain {
    justify-content: center;
    .orderUl {
      width: 80%;
      .orderProduct {
        .options {
          flex-direction: column;
          align-items: center;
          .carrPSec1 {
            align-items: center;
          }
        }
        .orderPrice {
          padding-left: 0rem;
        }
        .orderDiv {
          align-items: center;
          flex-direction: column;
        }
        .separadorBlack {
          width: 15rem;
        }
      }
    }
  }
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
