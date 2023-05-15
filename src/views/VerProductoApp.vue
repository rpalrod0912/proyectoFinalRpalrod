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
          <section class="secColor">
            <div class="colorDiv">
              <label
                v-for="(color, index) in this.productColors"
                class="labelColorButton"
                for="colorRadio"
                :key="index"
              >
                <!--Si ponemos atributo name A UN NOMBRE QUE No tengan atributos en comin se cambiara a poderser marcar todos-->
                <input
                  type="radio"
                  :id="`colorRadio${color.color}`"
                  name="colorRadio"
                  class="radioColor"
                  :value="color"
                />
                <span
                  @click="changeColor(`#colorRadio${color.color}`, color)"
                  :style="{ backgroundColor: color.estilo }"
                ></span>
              </label>
            </div>
          </section>

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
          <div class="productActions">
            <ButtonComponent
              @click="añadirProd()"
              class="colorBoton"
              msj="AÑADIR A LA CESTA"
            ></ButtonComponent>
            <LikeButton :productName="this.productData.nombre"></LikeButton>
          </div>
        </div>
        <input type="checkbox" v-model="this.added" id="popMenu__toggle" />
        <ul id="menuBox" class="popMenu__box">
          <div
            v-if="tallaElegida && colorElegido"
            class="popMenu__item textoGuresoh1"
          >
            <div @click="añadirProd()" class="hoverBox">
              <img class="closeModal" src="@/assets/DeleteIcon.png" />
            </div>

            <img src="@/assets/checked.png" />
            <p>{{ this.productData.nombre }} HA SIDO AÑADIDO AL CARRITO</p>
          </div>
          <div v-else class="popMenu__item textoGuresoh1">
            <div @click="añadirProd()" class="hoverBox">
              <img class="closeModal" src="@/assets/DeleteIcon.png" />
            </div>

            <img src="@/assets/cancel.png" />
            <p>DEBES ELEGIR TALLA Y COLOR PARA AÑADIR EL PRODUCTO AL CARRITO</p>
          </div>
        </ul>
      </section>
      <section class="descripcionProd">
        <h2>DESCRIPCIÓN</h2>
        <p>{{ this.productData.descripcion }}</p>
      </section>
      <section class="comentariosSec descripcionProd">
        <h2>OPINIONES({{ this.productData.comentarios.length }})</h2>
        <div
          v-for="(comentario, index) in this.productData.comentarios"
          :key="index"
          class="comentarioContainer"
        >
          <h1>{{ toTitleCase(comentario.userNameLastName) }}</h1>
          <p>
            {{ comentario.text }}
          </p>
        </div>
        <p v-if="this.auth"></p>
        <p v-else>NO LOGEADO</p>
        <div class="comentarioContainer">
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            v-model="comentario"
          ></textarea>
          <button @click="postComments()">Enviar</button>
        </div>
      </section>
    </div>
    <div v-else><LoadingSpinner class="spinner"></LoadingSpinner></div>
  </main>

  <AppFooter></AppFooter>
</template>
<script>
/*eslint-disable */
import { auth, onAuthStateChanged } from "../auth/firebaseConfig.js";
import AppFooter from "@/components/AppFooter.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import axios from "axios";
import WhiteHeader from "@/components/WhiteHeader.vue";
import { API_URL, scrollTop } from "@/helpers/basicHelpers";
import LikeButton from "@/components/LikeButton.vue";

export default {
  name: "VerProductoApp",
  añadirProd() {},
  async created() {
    debugger;
    this.auth = false;
    let self = this;
    auth.onAuthStateChanged(async function (user) {
      debugger;
      console.log(user);
      if (user !== null) {
        debugger;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
        self.auth = true;
        self.userData = await self.findUserByMail(user.email);
      } else {
        // User is signed out
        // ...
        self.auth = false;
      }
    });

    scrollTop();
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
    this.productId = this.$route.query.prodNombre;
    await this.getProductData(this.productId);

    this.productData = JSON.parse(JSON.stringify(this.datosProduct));
    this.productColors = this.filteredColors();
    console.log(this.productData);
    this.carga = true;
    console.log(this.auth);
    console.log(this.idUser);
  },
  data() {
    return {
      comentario: "",
      userData: null,
      auth: null,
      added: false,
      tallaElegida: null,
      colorElegido: null,
      productId: null,
      carga: false,
      productData: null,
      datosProduct: null,
      carritoIsOpened: this.$store.state.currentFilterMenu,
      colores: [
        {
          color: "Blanco",
          estilo: "white",
        },
        {
          color: "Negro",
          estilo: "black",
        },
        {
          color: "Azul",
          estilo: "blue",
        },
        {
          color: "Rojo",
          estilo: "red",
        },
        {
          color: "Verde",
          estilo: "green",
        },
      ],
      productColors: null,
      //prodColors: this.filteredColors(),
    };
  },

  components: {
    WhiteHeader,
    LoadingSpinner,
    AppFooter,
    ButtonComponent,
    LikeButton,
  },
  methods: {
    async postComments() {
      const objetoComentario = {
        text: this.comentario,
        productId: this.productData.idProduct,
        userId: this.userData.idUser,
      };
      const data = axios
        .post(`${API_URL}comments`, objetoComentario)
        .then((res) => console.log(res));
    },
    toTitleCase(str) {
      str = str
        .toLowerCase()
        .split(" ")
        .map(function (palabra) {
          return palabra.charAt(0).toUpperCase() + palabra.slice(1);
        });

      return str.join(" ");
    },
    changeColor(name, color) {
      this.colorElegido = color;
      document.querySelector(name).checked = true;
    },
    filteredColors() {
      return this.colores.filter((color) =>
        this.productData.color.includes(color.color)
      );
    },
    añadirCarro() {
      let carrito = JSON.parse(localStorage.getItem("userProducts"));
      if (carrito === null) {
        localStorage.setItem("userProducts", JSON.stringify({ cesta: [] }));
        carrito = JSON.parse(localStorage.getItem("userProducts"));
      }
      const datosPrd = {
        productName: this.productData.nombre,
        talla: this.tallaElegida,
        color: this.colorElegido,
      };

      console.log(carrito);
      const productAlreadyInCart = carrito.cesta.findIndex((producto) => {
        return (
          producto.productName === datosPrd.productName &&
          producto.talla === datosPrd.talla &&
          datosPrd.color.color === producto.color.color
        );
      });
      console.log(datosPrd.talla);
      if (productAlreadyInCart !== -1) {
        console.log(carrito.cesta[productAlreadyInCart].talla);
        console.log(datosPrd.talla);
        console.log(carrito.cesta[productAlreadyInCart].color);
        console.log(datosPrd.color);

        if (
          carrito.cesta[productAlreadyInCart].talla === datosPrd.talla &&
          carrito.cesta[productAlreadyInCart].color.color ===
            datosPrd.color.color
        ) {
          carrito.cesta[productAlreadyInCart].cantidad += 1;
        } else {
          carrito.cesta.push({
            productName: this.productData.nombre,
            cantidad: 1,
            talla: datosPrd.talla,
            color: datosPrd.color,
          });
        }
      } else {
        carrito.cesta.push({
          productName: this.productData.nombre,
          cantidad: 1,
          talla: datosPrd.talla,
          color: datosPrd.color,
        });
      }
      localStorage.setItem("userProducts", JSON.stringify(carrito));
      this.$store.commit(
        "setCurrentCart",
        JSON.parse(localStorage.getItem("userProducts"))
      );
    },
    añadirProd() {
      if (!this.added) {
        console.log(document.querySelector("#popMenu__toggle").checked);
        this.added = true;
        if (this.tallaElegida) {
          this.añadirCarro();
        }
      } else {
        this.added = false;
      }
    },
    async getProductData(id) {
      console.log(id);
      this.carga = false;
      const data = await axios
        .get(`${API_URL}products/nombre/${id}`)
        .then((res) => (this.datosProduct = res.data));
      return data;
    },
    async findUserByMail(mail) {
      const data = await axios
        .get(`${API_URL}users/email/${mail}`)
        .then((res) => (this.datosProduct = res.data));
      debugger;
      console.log(data);
      return data;
    },
  },

  watch: {
    "$store.state.currentFilterMenu": {
      deep: true,
      handler(newVal) {
        debugger;

        if (newVal) {
          document.querySelector(".productoInfo1").style.zIndex = "-1";
        }
        if (!newVal) {
          document.querySelector(".productoInfo1").style.zIndex = "0";
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
.contenedorImagenes {
  .comentariosSec {
    margin-top: 3rem;
    padding-bottom: 1rem;
    h2 {
      padding-bottom: 2.5rem;
    }
  }
}

.secColor {
  @include fuenteSemiBold;
  @include flexInputDpNone;
  border: 2px solid #dee5ff;
  border-radius: 5px;
  box-shadow: 0 2px 4px #dee5ff;
  display: block;
  max-width: 18.7rem;
  background: #fff;
  color: #262e47;
  font-weight: bold;
  padding: 0 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  margin-bottom: 2rem;
  margin-top: 0rem;

  .colorDiv {
    width: 100%;
  }
  div {
    margin-bottom: 1rem;
  }
}
.labelColorButton {
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
  margin: 10px;
  cursor: pointer;
  span {
    justify-content: center;
    align-items: center;
    position: absolute;
    display: flex;
    width: 50px;
    height: 50px;
    padding: 0;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background: #eeeeee;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    transition: ease 0.3s;
  }
  span:hover {
    padding: 10px;
  }
  input:checked + span {
    position: absolute;
    padding: 7px;

    top: 50%;
    left: 50%;
    border: 1px solid black;
  }
  input:checked + button {
    background-color: #e7e7e7;
  }
}
.hide {
  display: none;
}

.productActions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  left: -0.5rem;
}
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
    overflow: hidden;
    transition: transform 0.1s;
    margin-right: 1rem;
    margin-bottom: 1rem;
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

  .popMenu__item {
    display: flex;
    align-items: center;
    flex-direction: column;
    //padding: 12px 24px;
    //margin-top: 0.5rem;
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
    //z-index: -1;
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

.descripcionProd {
  .comentarioContainer {
    width: 100%;
    padding: 8px;
    margin: 0.4rem;
    background-color: #f9f9f9;
    border: none;
    /* height: 1rem; */
    padding-top: 1.7rem;
    border-bottom: 1px solid #c8c8c8;
    transition: 0.07s;
    font-size: 0.9rem;
    border-radius: 4px;
    h1 {
      @include fuenteBold;
    }
    p {
      margin-top: 3rem;
      padding-bottom: 1.8rem;
      font-size: 1.2rem;
    }
    h1,
    p {
      padding-left: 1rem;
    }
    textArea {
      background-color: #ececec;
      border-radius: 3px;
      outline: none;
      border: none;
      resize: none;
      @include fuenteRegular;
    }
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
#popMenu__toggle {
  display: none;
}
</style>
