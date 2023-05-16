<template>
  <WhiteHeader tipo="blanco"></WhiteHeader>
  <main>
    <section class="secIni1">
      <img class="imgSec1" src="../assets/imInicioUsoWeb.jpg" />
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
      <img class="imgSecDesktop" src="../assets/imSec2.png" />
      <img class="imgSecMobile" src="../assets/mobile/imSec2Comprimida.jpg" />
    </section>
    <section class="secIni3">
      <img class="imgSecDesktop" src="../assets/imSec3.jpg" />
      <img class="imgSecMobile" src="../assets/mobile/imSec3comprimida.jpg" />
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
import PopUpModal from "@/components/popUpModal.vue";
export default {
  /*eslint-disable */
  created() {
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
