<template>
  <footer>
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
  </footer>
</template>
<script>
export default {
  name: "AppFooter",
};
</script>
<style scoped lang="scss">
footer {
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
  ul {
    list-style-type: none;
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
</style>
