<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <main>
    <section class="guide">
      <div class="contactoContainer">
        <div class="contactoContainerHeader">
          <img src="../assets/whatsapp.png" />
          <h2>WHATSAPP</h2>
          <div class="serviceDown">
            <p class="circleDown"></p>
            <p>OFFLINE</p>
          </div>
        </div>
        <p style="padding-top: 1rem">De lunes a viernes, de 09:00 a 18:00.</p>
        <p>Sábados, de 10:00 a 18:00.</p>
        <input type="submit" class="nextButtonSubmit" />
      </div>
      <div class="separador"></div>
      <div class="contactoContainer">
        <div class="contactoContainerHeader">
          <h2>LIVE CHAT</h2>
          <div class="serviceDown">
            <p class="circleDown"></p>
            <p>OFFLINE</p>
          </div>
        </div>
        <p style="padding-top: 1rem">De lunes a viernes, de 09:00 a 18:00.</p>
        <p>Sábados, de 10:00 a 18:00.</p>
        <input type="submit" class="nextButtonSubmit" />
      </div>
      <div class="separador"></div>
      <div class="contactoContainer">
        <div class="contactoContainerHeader">
          <h2>TELÉFONO</h2>
          <div class="serviceUp">
            <p>923 651 062</p>
          </div>
        </div>
        <p style="padding-top: 1rem">De lunes a viernes, de 09:30 a 18:00</p>
      </div>
      <div class="separador"></div>
      <div class="contactoContainer">
        <div class="contact contactoContainerHeader">
          <h2>MAIL</h2>
          <div class="serviceUp">
            <p>CONTACT@STREETUP.COM</p>
          </div>
        </div>
        <p style="padding-top: 1rem">De lunes a viernes, de 09:30 a 18:00</p>
      </div>
    </section>
    <section class="guideImg">
      <img
        src="../assets/imagenContactoComprmida.jpg"
        alt="Imagen chica Joven"
      />
    </section>
  </main>
  <AppFooter></AppFooter>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";
import WhiteHeader from "@/components/WhiteHeader.vue";
import { scrollTop } from "@/helpers/basicHelpers";

export default {
  name: "ContactoApp",
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
@import "../styles/views/ContactoApp.scss";
</style>
