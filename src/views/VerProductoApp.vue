<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <main>
    <div @click="añadirProd()" v-if="added" class="outsideClick"></div>

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
          <ButtonComponent
            @click="añadirProd()"
            class="colorBoton"
            msj="AÑADIR A LA CESTA"
          ></ButtonComponent>
        </div>
        <input type="checkbox" v-model="this.added" id="popMenu__toggle" />
        <ul id="menuBox" class="popMenu__box">
          <div class="popMenu__item textoGuresoh1">HOLA</div>
          <ul>
            <div @click="menuAction(false)" class="greyContainer"></div>
          </ul>
        </ul>
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
/*eslint-disable */
import AppFooter from "@/components/AppFooter.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import axios from "axios";

import WhiteHeader from "@/components/WhiteHeader.vue";
import { API_URL, scrollTop } from "@/helpers/basicHelpers";

export default {
  name: "VerProductoApp",
  añadirProd() {},
  async created() {
    scrollTop();
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
    this.productId = this.$route.query.prodNombre;
    await this.getProductData(this.productId);
    debugger;

    this.productData = JSON.parse(JSON.stringify(this.datosProduct));
    console.log(this.productData);
    this.carga = true;
  },
  data() {
    return {
      added: false,
      tallaElegida: null,
      productId: null,
      carga: false,
      productData: null,
      datosProduct: null,
    };
  },
  components: { WhiteHeader, LoadingSpinner, AppFooter, ButtonComponent },
  methods: {
    añadirProd() {
      debugger;
      if (!this.added) {
        console.log(document.querySelector("#popMenu__toggle").checked);
        this.added = true;
      } else {
        this.added = false;
      }
    },
    async getProductData(id) {
      debugger;
      console.log(id);
      this.carga = false;
      const data = await axios
        .get(`${API_URL}products/nombre/${id}`)
        .then((res) => (this.datosProduct = res.data));
      return data;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
//Ul Basado de https://codepen.io/ozer/pen/rRvogO
.outsideClick {
  position: absolute;
  width: 100%;
  background-color: #6e7272;
  opacity: 0.6;
  height: 191%;
  top: 0;
}
body {
  display: flex;
  flex-direction: column;
  main {
    width: 100%;
    padding-top: 18rem;
    margin-bottom: 10rem;
  }
  .colorBoton {
    @include loginButton("green", "white", "2rem");
    height: 1rem;
    width: 15rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.1s;
    z-index: 1;
  }
  .colorBoton:hover {
    transform: scale(1.1);
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
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-items: flex-start;
    padding-bottom: 6rem;
  }

  .dropdown {
    @include dropdownList;
  }

  .bodyStyle {
    overflow: hidden;
  }
  @include popUpModal("#popMenu__toggle", ".menu__btn", ".popMenu__box");

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

  .productDiv {
    min-width: 20rem;
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
  .spinner {
    display: flex;
    margin: 0 auto;
  }
}

@media (max-width: 800px) {
  body {
    main {
      padding-top: 8em;
    }
    .colorBoton {
      width: 100%;
    }
    .productoInfo1 {
      width: auto;
      padding-left: 0rem;
      padding-top: 0rem;
      h2 {
        text-align: center;
      }
    }
    .descripcionProd {
      h2 {
        text-align: center;
        font-size: 1.8em;
        padding-bottom: 4rem;
      }
      p {
        font-size: 1.3rem;
      }
    }
  }
}
</style>
