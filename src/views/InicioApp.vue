<template>
  <WhiteHeader tipo="blanco"></WhiteHeader>
  <main>
    <section class="secIni1">
      <img
        class="imgSec1"
        src="../assets/imInicioUsoWeb.jpg"
        alt="hombresSentadosFondo"
      />
      <video
        autoplay
        class="vidSec1"
        src="../assets/video/videoSection1.mp4"
      ></video>
    </section>

    <section class="secIniOfer">
      <h1>
        ¡PROMOCIONES HASTA EL 50 % DE DESCUENTO! ELIGE ENTRE MÁS DE 100
        PRODUCTOS SELECCIONADOS DE ESTA TEMPORADA
      </h1>
      <ButtonComponent
        @click="seeSaleProd()"
        class="seeSales"
        msj="VER OFERTAS"
      ></ButtonComponent>
    </section>
    <section class="secIni2">
      <img
        class="imgSecDesktop"
        src="../assets/imSec2.png"
        alt="imagenSeccion2"
      />
      <img
        class="imgSecMobile"
        src="../assets/mobile/imSec2Comprimida.jpg"
        alt="imagenSeccion2Mobile"
      />
    </section>
    <section class="secIni3">
      <img
        class="imgSecDesktop"
        src="../assets/imSec3.jpg"
        alt="imagenSeccion3"
      />
      <img
        class="imgSecMobile"
        src="../assets/mobile/imSec3comprimida.jpg"
        alt="imagenSeccion3Mobile"
      />
    </section>
  </main>
  <AppFooter></AppFooter>
  <PopUpModal
    :is-opened="true"
    v-if="this.recienRegistrado === 'SI'"
    msj="TE HAS REGISTRADO CON ÉXITO"
  ></PopUpModal>
  <PopUpModal
    :is-opened="true"
    v-if="this.recienLogeado === 'SI'"
    msj="HAS INICIADO SESIÓN CON ÉXITO"
  ></PopUpModal>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { scrollTop } from "@/helpers/basicHelpers";
import WhiteHeader from "@/components/WhiteHeader.vue";
import {
  auth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "@/auth/firebaseConfig.js";
import PopUpModal from "@/components/popUpModal.vue";
export default {
  /*eslint-disable */

  created() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
    if (document.querySelector("body").classList.contains("bodyStyle")) {
      debugger;
      document.querySelector("body").classList.remove("bodyStyle");
    }
    scrollTop();

    this.recienRegistrado = this.$route.query.recienRegistrado;
    this.recienLogeado = this.$route.query.recienLogeado;
  },
  data() {
    return {
      recienRegistrado: "NO",
      recienLogeado: "SI",
    };
  },
  methods: {
    seeSaleProd() {
      this.$router.push({
        name: "products",
        query: { oferta: "MOSTRAR" },
      });
    },
  },
  name: "InicioApp",
  components: { WhiteHeader, AppFooter, ButtonComponent, PopUpModal },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap");
@import "../styles/views/InicioApp.scss";
</style>
