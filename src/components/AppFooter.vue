<template>
  <footer>
    <div class="separadorNoMargin"></div>

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
          <li><img src="../assets/isntagramIcon.png" alt="instagram" /></li>
          <li><img src="../assets/youtubeIcon.png" alt="youtube" /></li>
          <li><img src="../assets/twitterIcon.png" alt="twitter" /></li>
        </div>
      </ul>
      <ul class="payment">
        <h1>MÉTODOS DE PAGO</h1>
        <div class="paymentDiv">
          <li><img src="@/assets/paymentsIcons/visaIcon.png" alt="visa" /></li>
          <li>
            <img
              src="@/assets/paymentsIcons/masterCardIcon.png"
              alt="masterCard"
            />
          </li>
          <li>
            <img src="@/assets/paymentsIcons/amazonIcon.png" alt="amazon" />
          </li>
        </div>
        <div class="paymentDiv payment2">
          <li>
            <img src="@/assets/paymentsIcons/paysafeIcon.png" alt="payasafe" />
          </li>
          <li>
            <img src="@/assets/paymentsIcons/appleIcon.png" alt="apple" />
          </li>
          <li>
            <img src="@/assets/paymentsIcons/paypalIcon.png" alt="paypal" />
          </li>
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
        <img src="../assets/worldIcon.png" alt="world" />
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
@import "../styles/layout/AppFooter.scss";
</style>
