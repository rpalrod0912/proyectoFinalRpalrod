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

main {
  display: flex;
  background-color: rgb(246, 246, 246);

  .guide {
    padding-top: 16rem;
    padding-bottom: 3rem;
    width: 50%;
    display: flex;
    flex-direction: column;

    h1,
    h2 {
      font-size: 46px;
      //font-size: 2.3rem;
      padding: 20px;
      padding-left: 5rem;
      padding-right: 5rem;
      color: #242424;
    }
    p {
      padding: 10px;
      padding-left: 5rem;
      padding-right: 5rem;
      color: #777;
    }
    h1 {
      @include fuenteSemiBold;
      font-size: 2rem;
    }
    h2 {
      @include fuenteBold;
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
@media (max-width: 790px) {
  main {
    flex-direction: column-reverse;
    .guide {
      padding-top: 3rem;

      width: 100%;
    }
    .guideImg {
      width: 100%;
      img {
        height: 40rem;
        -o-object-fit: cover;
        object-fit: cover;
        object-position: 27% 28%;
      }
    }
  }
}
@media (max-width: 430px) {
  main {
    .guide {
      h1,
      h2 {
        padding-left: 3rem;
        padding-right: 3rem;
      }
      h2 {
        font-size: 30px;
      }
      h1 {
        font-size: 1.4rem;
      }
      p {
        font-size: 0.8rem;
        padding-left: 3rem;
        padding-right: 3rem;
      }
    }
    .guideImg {
      img {
        height: 17rem;
        object-position: 25% 19%;
      }
    }
  }
}
</style>
