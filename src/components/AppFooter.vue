<template>
  <footer>
    <section class="secFoot1">
      <ul class="help">
        <h1>AYUDA</h1>
        <li>Preguntas Frecuentes</li>
        <li>Estado de mi pedido</li>
        <li>Envíos</li>
      </ul>
      <ul class="social">
        <h1>REDES SOCIALES</h1>
        <div class="socialDiv">
          <li><img src="../assets/isntagramIcon.png" /></li>
          <li><img src="../assets/youtubeIcon.png" /></li>
          <li><img src="../assets/twitterIcon.png" /></li>
        </div>
      </ul>
      <ul class="payment">
        <h1>MÉTODOS DE PAGO</h1>
        <div class="paymentDiv">
          <li><img src="@/assets/paymentsIcons/visaIcon.png" /></li>
          <li><img src="@/assets/paymentsIcons/masterCardIcon.png" /></li>
          <li><img src="@/assets/paymentsIcons/amazonIcon.png" /></li>
        </div>
        <div class="paymentDiv payment2">
          <li><img src="@/assets/paymentsIcons/paysafeIcon.png" /></li>
          <li><img src="@/assets/paymentsIcons/appleIcon.png" /></li>
          <li><img src="@/assets/paymentsIcons/paypalIcon.png" /></li>
        </div>
      </ul>
    </section>
    <div class="separador"></div>
    <section class="secFoot2">
      <ul>
        <li>Política de Privacidad</li>
        <li class="sepVertical">|</li>
        <li>Condiciones de Compra</li>
        <li class="sepVertical">|</li>
        <li>Política de Cookies</li>
      </ul>
      <div class="pageLang">
        <img src="../assets/worldIcon.png" />
        <p>España</p>
        <div class="sepVerticalBlack">|</div>
        <p>Español</p>
      </div>
    </section>
  </footer>
</template>
<script>
export default {
  name: "AppFooter",
};
</script>
<style scoped lang="scss">
@import "../helpers/mixings.scss";

ul {
  list-style-type: none;
}

.sepVerticalBlack {
  display: flex;
  justify-items: center;
  padding: 1px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  color: black;
  width: 0.1rem;
  justify-content: center;
}

.sepVertical {
  display: flex;
  justify-items: center;
  padding: 1px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  color: #95a3a4;
  width: 0.3rem;
  background-color: #95a3a4;
  justify-content: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.separador {
  border-top: 1px solid #dadada;
  height: 2px;
  padding: 0;
  margin: 20px auto 0 auto;
}
.secFoot1 {
  display: flex;
  margin-top: 4rem;
  justify-content: space-around;
  flex-wrap: wrap;
  h1 {
    font-family: "Noto Sans", sans-serif;
    font-size: 1.5rem;
  }
  img {
    width: 4rem;
  }

  .help {
    li {
      margin-top: 0.5rem;
      font-family: "Noto Sans";
      font-style: normal;
      font-weight: 600;
      color: #95a3a4;
      font-size: 1.2rem;
    }
  }
  .socialDiv {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    li {
      padding-right: 2rem;
    }
  }
  .paymentDiv {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    li {
      padding-right: 2rem;
    }
  }
  .payment2 {
    margin-top: 0.1rem;
  }
}

.secFoot2 {
  margin-top: 4rem;
  margin-bottom: 3rem;
  @include fuenteSemiBold;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  ul {
    display: flex;
    align-items: center;

    li {
      margin: 1rem;
    }
  }
  .pageLang {
    display: flex;
    align-items: center;
    justify-content: center;
    p,
    div {
      margin: 0.3rem;
    }
    img {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
