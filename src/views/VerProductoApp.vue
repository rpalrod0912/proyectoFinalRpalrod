<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <PopUpModal
    @ventanaError="setPostError"
    v-if="this.postError"
    :is-opened="this.postError"
    :isError="true"
    msj="EL COMENTARIO DEBE TENER AL MENOS 10 LÍNEAS DE TEXTO"
  ></PopUpModal>
  <PopUpModal
    @ventanaError="setPostError"
    v-if="comentarioPublicado"
    :is-opened="true"
    msj="¡MUCHAS GRACIAS POR COMPARTIR TU OPINIÓN!"
  ></PopUpModal>
  <PopUpModal
    @ventanaBorrarComment="setPostError"
    @ventanaDeleteComment="deleteUserOpinion"
    v-if="deleteComment"
    :is-opened="this.deleteComment"
    :isOperation="true"
    msj="¿Seguro que quieres borrar tu opinión?"
  >
  </PopUpModal>
  <main>
    <div @click="añadirProd()" v-if="added" class="outsideClick"></div>

    <div class="contenedorImagenes" v-if="this.carga">
      <section class="presentacionProd">
        <div class="productDiv">
          <img :src="this.productData.imagen" alt="productImg" />
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
        <ul v-if="added" id="menuBox" class="popMenu__box">
          <div
            v-if="tallaElegida && colorElegido"
            class="popMenu__item textoGuresoh1"
          >
            <div @click="añadirProd()" class="hoverBox">
              <img
                class="closeModal"
                src="@/assets/DeleteIcon.png"
                alt="eliminarIcon"
              />
            </div>

            <img class="modalImg" src="@/assets/checked.png" alt="checked" />
            <p>{{ this.productData.nombre }} HA SIDO AÑADIDO AL CARRITO</p>
          </div>
          <div v-else class="popMenu__item textoGuresoh1">
            <div @click="añadirProd()" class="hoverBox">
              <img
                class="closeModal"
                src="@/assets/DeleteIcon.png"
                alt="borrar"
              />
            </div>

            <img
              class="modalImg"
              src="@/assets/cancel.png"
              alt="CancelarIcono"
            />
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
          <div class="cabeceraComentario">
            <h1>{{ toTitleCase(comentario.userNameLastName) }}</h1>
            <div
              @click="this.deleteComment = true"
              v-if="index === this.comentarioUsuario"
              class="deleteImg"
            >
              <img src="../assets/DeleteIcon.png" alt="EliminarIcono" />
            </div>
          </div>
          <div class="puntuacion">
            <div>
              <template v-for="index in 5" :key="index">
                <img
                  v-if="index <= comentario.rating"
                  src="../assets/rating/voted.png"
                  alt="Opiniones"
                />
                <img
                  v-else
                  src="../assets/rating/unVoted.png"
                  alt="Sin Opiniones"
                />
              </template>
            </div>
          </div>
          <p>
            {{ comentario.text }}
          </p>
        </div>
        <div
          v-for="(comentario, index) in this.productData.comentarios"
          :key="index"
        >
          {{ comentario.text }}
        </div>
        <div v-if="comentarioUsuario === -1 && auth" class="comentarioContainer">
          <form  @submit.prevent="postComments()">
            <div class="cabeceraPost">
              <label for="tuComentario"> ¡Danos tu Opinión!</label>
              <div class="puntuacion">
                <template v-for="index in 5" :key="index">
                  <img
                    v-if="index > this.yourScore"
                    @click="this.yourScore = index"
                    src="../assets/rating/unVoted.png"
                    alt="Sin opiniones"
                  />
                  <img
                    v-else
                    @click="this.yourScore = index"
                    src="../assets/rating/voted.png"
                    alt="opiniones"
                  />
                </template>
              </div>
            </div>
            <div class="postContent">
              <textarea
                id="tuComentario"
                name="tuComentario"
                rows="4"
                cols="50"
                v-model="comentario"
                placeholder="Cuentanos como ha sido tu experiencia con el producto..."
              ></textarea>

              <input type="submit" class="typeSubmit" value="ENVIAR" />
            </div>
          </form>
        </div>
      </section>
    </div>
    <div v-else><LoadingSpinner class="spinner"></LoadingSpinner></div>
  </main>

  <AppFooter></AppFooter>
</template>
<script>
/*eslint-disable */
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { auth, onAuthStateChanged } from "../auth/firebaseConfig.js";
import AppFooter from "@/components/AppFooter.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import axios from "axios";
import WhiteHeader from "@/components/WhiteHeader.vue";
import { API_URL, scrollTop } from "@/helpers/basicHelpers";
import LikeButton from "@/components/LikeButton.vue";
import PopUpModal from "@/components/popUpModal.vue";

export default {
  name: "VerProductoApp",
  añadirProd() {},
  async created() {
    this.auth = false;
    let self = this;
    this.auth = await this.IsLoggedIn();
    scrollTop();
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
    this.productId = this.$route.query.prodNombre;
    await this.getProductData(this.productId);

    this.productData = JSON.parse(JSON.stringify(this.datosProduct));
    this.productColors = this.filteredColors();
    this.comentarioUsuario = this.IsLoggedUserComment(
      this.productData.comentarios
    );

    this.carga = true;
  },
  data() {
    return {
      deleteComment: false,
      comentarioPublicado: false,
      comentarioUsuario: null,
      v$: useVuelidate(),
      postError: false,
      yourScore: 0,
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
  validations() {
    return {
      comentario: {
        required,
        minLength: minLength(10),
      },
    };
  },

  components: {
    WhiteHeader,
    LoadingSpinner,
    AppFooter,
    ButtonComponent,
    LikeButton,
    PopUpModal,
  },
  methods: {
    IsLoggedUserComment(array) {
      if (this.auth) {
        return array.findIndex((elemento) => {
          return parseInt(elemento.userId) === parseInt(this.userData.idUser);
        });
      }
      return -1;
    },
    async IsLoggedIn() {
      try {
        await new Promise((resolve, reject) =>
          auth.onAuthStateChanged(
            async (user) => {
              if (user) {
                this.userData = await this.findUserByMail(user.email);
                resolve("Usuario logeado");
              } else {
                reject("No Logeado");
              }
            },
            // Prevent console errors
            (error) => reject(error)
          )
        );
        return true;
      } catch (error) {
        return false;
      }
    },
    setPostError(val) {
      this.deleteComment = val;
      this.postError = val;
    },
    deleteUserOpinion(val) {
      if (val === true) {
        this.deleteUserComments();
      }
    },
    async deleteUserComments() {
      const opinionId = this.productData.comentarios[this.comentarioUsuario].id;
      let respuesta;
      const data = await axios
        .delete(`${API_URL}comments/${opinionId}`)
        .then((res) => (respuesta = res));
      setInterval(() => {
        this.$router.go();
      }, 1200);
    },
    async postComments() {
      this.v$.$validate();

      if (!this.v$.$error) {
        const objetoComentario = {
          text: this.comentario,
          productId: this.productData.idProduct,
          userId: this.userData.idUser,
          rating: this.yourScore,
        };
        const data = axios.post(`${API_URL}comments`, objetoComentario);
        this.comentarioPublicado = true;
        setInterval(() => {
          this.$router.go();
        }, 1200);
      } else {
        this.postError = true;
      }
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

      const productAlreadyInCart = carrito.cesta.findIndex((producto) => {
        return (
          producto.productName === datosPrd.productName &&
          producto.talla === datosPrd.talla &&
          datosPrd.color.color === producto.color.color
        );
      });
      if (productAlreadyInCart !== -1) {
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
        this.added = true;
        if (this.tallaElegida) {
          this.añadirCarro();
        }
      } else {
        this.added = false;
      }
    },
    async getProductData(id) {
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
      return data;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
@import "../styles/views/VerProducto.scss";

@include inputTypeSubmit;
</style>
