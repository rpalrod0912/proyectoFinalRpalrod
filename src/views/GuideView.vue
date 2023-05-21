<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <main>
    <section class="guide">
      <h1>CÓMO COMPRAR</h1>
      <p>Comprar en StreetUp es muy sencillo</p>
      <p>Sigue los siguientes pasos</p>
      <h2>01.</h2>
      <p>
        Crea una cuenta, aunque ofrecemos diversas manera de crearlas,
        recomendamos primero crear un cuenta con correo electrónico y luego
        conectarla con cualquiera de los método de inicio de sesión que
        ofrecemos
      </p>
      <h2>02.</h2>
      <p>
        Verifica tu cuenta recién creada para iniciar sesión. En enlace sera
        mandado a tu correo electróni tras registrarte. Si usas otro método de
        inicio de sesión no es necesario
      </p>
      <h2>03.</h2>
      <p>
        Elige el Producto que quieras, puedes usar el buscador de productos o
        mirar en la extensa lista que ofrecemos
      </p>
      <h2>04.</h2>
      <p>
        Elige la talla y el color del producto y añadelo a la cesta, no es
        necesario haber iniciado sesión
      </p>
      <h2>05.</h2>
      <p>
        Tramita el pedido, es necesario tener una cuenta, registrate si no lo
        hiciste previamente
      </p>
      <h2>06.</h2>
      <p>
        Añade los datos de facturación del pedido si te acabas de registrar y
        tramita el pedido
      </p>
      <h2>07.</h2>
      <p>¡Disfruta de experiencia en StreetUp!</p>
    </section>
    <section class="guideImg">
      <img src="../assets/imagenComprimidaGuia.jpg" alt="ImagenGuiaCompra" />
    </section>
  </main>
  <AppFooter></AppFooter>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";
import WhiteHeader from "@/components/WhiteHeader.vue";
import { scrollTop } from "@/helpers/basicHelpers";
export default {
  name: "GuideView",
  components: { WhiteHeader, AppFooter },
  created() {
    if (document.querySelector("body").classList.contains("bodyStyle")) {
      document.querySelector("body").classList.toggle("bodyStyle");
    }
    scrollTop();
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
@import "../styles/views/GuideView.scss";
</style>
