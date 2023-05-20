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
</template>
<script>
import WhiteHeader from "@/components/WhiteHeader.vue";

export default {
  name: "PaymentMethodsView",
  components: { WhiteHeader },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";

main {
  display: flex;
  background-color: rgb(246, 246, 246);
  .guide {
    padding-top: 9rem;

    width: 50%;
    display: flex;
    flex-direction: column;

    h1,
    h2 {
      font-size: 2.3rem;
      padding: 20px;
      padding-left: 5rem;
      padding-right: 5rem;
    }
    p {
      padding: 10px;
      padding-left: 5rem;
      padding-right: 5rem;
    }
    h1 {
      @include fuenteBold;
    }
    h2 {
      @include fuenteSemiBold;
    }
    p {
      @include fuenteRegular;
    }
  }
  .guideImg {
    width: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
