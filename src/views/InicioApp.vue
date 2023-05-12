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
* {
  margin: 0;
}
button {
  cursor: pointer;
}

.seeSales:hover {
  p {
    color: white;
  }
  background-color: #302b27;
  cursor: pointer;
}

.seeSales {
  p {
    background-color: transparent;
    transition: 0.2s;

    color: #302b27;
  }
  background-color: transparent;
  border: 1px solid #302b27;
  transition: 0.5s;
}
@media (max-width: 400px) {
  .seeSales {
    width: 80%;
  }
}
.vidSec1 {
  width: 100%;
}
body {
  background-color: white;
}
.separadorAlterno {
  border-top: 1px solid #95a3a4;
  height: 2px;
  padding: 0;
  width: 100%;
  margin-top: 1.1rem;
}
.bodyOpacity {
  -webkit-transition: opacity 300ms ease-in-out;
  transition: opacity 300ms ease-in-out;
  opacity: 0.5;
}
//GENERAL CONTAINER -> CSS MENU IZQUIERDAD GENERAWL DE LA PÁGINA
.generalContainers {
  display: flex;
  z-index: 1;
}
main {
  .secIni1 {
    img {
      width: 100%;
    }
  }
  .secIniOfer {
    //margin-top: 1.5rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 1rem;
    height: auto;
    background-color: #04724d;
    color: black;
    font-family: "Noto Sans", sans-serif;
    h1 {
      text-align: center;

      //width: 35rem;
      padding: 2rem;
    }
    justify-content: center;
  }
  @media (max-width: 400px) {
    .secIniOfer {
      h1 {
        font-size: 1rem;
        width: 62%;
      }
    }
  }
  .secIni2 {
    margin-top: 0.3em;
    img {
      width: 100%;
    }
  }

  .secIni3 {
    //margin-top: 2rem;
    img {
      width: 100%;
    }
  }
}
@media (min-width: 500px) {
  .vidSec1,
  .imgSecMobile {
    display: none;
  }
}
@media (max-width: 499px) {
  .imgSecDesktop,
  .imgSec1 {
    display: none;
  }
}
</style>
