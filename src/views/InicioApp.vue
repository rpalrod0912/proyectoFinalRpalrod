<template>
  <WhiteHeader></WhiteHeader>
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
</template>
<script>
import WhiteHeader from "@/components/WhiteHeader.vue";
export default {
  /*eslint-disable */
  name: "InicioApp",
  components: { WhiteHeader },
};
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&display=swap");
* {
  margin: 0;
}
body {
  background-color: white;
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
