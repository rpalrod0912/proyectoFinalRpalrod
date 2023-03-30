<template>
  <WhiteHeader tipo="blanco"></WhiteHeader>
  <main>
    <section class="secIni1">
      <img src="../assets/imInicioUsoWeb.jpg" />
    </section>

    <section class="secIniOfer">
      <h1>
        ¡PROMOCIONES HASTA EL 50 % DE DESCUENTO! ELIGE ENTRE MÁS DE 100
        PRODUCTOS SELECCIONADOS DE ESTA TEMPORADA
      </h1>
    </section>
    <section class="secIni2">
      <img src="../assets/imSec2.png" />
    </section>
    <section class="secIni3">
      <img src="../assets/imSec3.jpg" />
    </section>
  </main>
  <AppFooter></AppFooter>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";

import WhiteHeader from "@/components/WhiteHeader.vue";
export default {
  /*eslint-disable */
  name: "InicioApp",
  components: { WhiteHeader, AppFooter },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap");
* {
  margin: 0;
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
    margin-top: 1.5rem;

    display: flex;
    height: auto;
    background-color: #04724d;
    color: black;
    font-family: "Noto Sans", sans-serif;
    h1 {
      text-align: center;
      width: 35rem;
      padding: 2rem;
    }
    justify-content: center;
  }
  .secIni2 {
    margin-top: 2rem;
    img {
      width: 100%;
    }
  }

  .secIni3 {
    margin-top: 2rem;
    img {
      width: 100%;
    }
  }
}
</style>
