<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <main>
    <div class="contenedorImagenes" v-if="this.carga">
      <section class="presentacionProd">
        <div class="productDiv">
          <img :src="this.productData.imagen" />
        </div>
        <div class="productoInfo1">
          <h2 class="textoH2">{{ this.productData.nombre }}</h2>
          <h2 class="textoH2Bold">{{ this.productData.precio }} €</h2>
          <div class="dropdown">
            <label class="dropdown--label">
              <input type="checkbox" class="dropdown--checkbox" />
              <span v-if="this.tallaElegida === null" class="dropdown--text">
                Elegir Talla
                <span class="dropdown--arrow"></span>
              </span>
              <span v-else class="dropdown--text">
                Talla: {{ this.tallaElegida }}
                <span class="dropdown--arrow"></span>
              </span>

              <div class="dropdown--list">
                <ul>
                  <li
                    v-for="(talla, index) in this.productData.talla"
                    :key="index"
                  >
                    <p @click="this.tallaElegida = talla">{{ talla }}</p>
                  </li>
                </ul>
              </div>
            </label>
          </div>
        </div>
      </section>
      <section class="descripcionProd">
        <h2>DESCRIPCIÓN</h2>
        <p>{{ this.productData.descripcion }}</p>
      </section>
    </div>
    <div v-else><LoadingSpinner class="spinner"></LoadingSpinner></div>
  </main>
  <AppFooter></AppFooter>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import WhiteHeader from "@/components/WhiteHeader.vue";
import { API_URL } from "@/helpers/basicHelpers";

export default {
  name: "VerProductoApp",
  created() {
    this.productId = this.$route.query.prodId;
    this.getProductData(this.productId);
  },
  data() {
    return {
      tallaElegida: null,
      productId: null,
      carga: false,
      productData: null,
    };
  },
  components: { WhiteHeader, LoadingSpinner, AppFooter },
  methods: {
    async getProductData(id) {
      this.carga = false;
      const data = await fetch(`${API_URL}productos/${id}`).then((res) =>
        res.json()
      );
      this.productData = data;
      console.log(this.productData);
      this.carga = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
//Ul Basado de https://codepen.io/ozer/pen/rRvogO
body {
  display: flex;
  flex-direction: column;
  main {
    width: 100%;
    padding-top: 18rem;
    margin-bottom: 10rem;
  }
  .descripcionProd {
    width: 65%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    @include fuenteBold;
    h2 {
      font-size: 2rem;
      padding-bottom: 4rem;
    }
    p {
      font-size: 1.6rem;
      @include fuenteRegular;
    }
  }
  .presentacionProd {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: flex-start;
    padding-bottom: 6rem;
  }

  .dropdown {
    @include dropdownList;
  }

  .productDiv {
    width: 30%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    // width: 320px;
    height: 488px;
    background-color: beige;
    border-radius: 18px;
    margin: 3rem;
    img {
      width: 15rem;
    }
  }
  .productoInfo1 {
    width: 30%;
    padding-left: 6rem;
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    @include fuenteSemiBold;
    h2,
    ul {
      padding-bottom: 1.5rem;
    }

    /*
    position: relative;
    right: 29vw;
    */
  }
}
</style>
