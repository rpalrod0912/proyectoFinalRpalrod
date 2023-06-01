<template>
  <div class="userOrderMenu">
    <div class="cabeceraMenu">
      <h1 class="TopMenu__item textoGruesoh1">
        HOLA {{ userData.nombre.toUpperCase() }}
        {{ userData.apellidos.toUpperCase() }}
      </h1>
    </div>
    <div class="separadorBlack"></div>
    <div class="menuOptions">
      <div class="parentElement">
        <div
          @click="this.$router.push('/pedidos')"
          class="subElement"
          id="firstOption"
        >
          <h2>Mis Compras</h2>
          <img src="../assets/Caja.png" alt="boxIcon" />
        </div>
        <div
          @click="this.$router.push('/tuinformacion')"
          class="subElement"
          id="secondOption"
        >
          <h2>Datos Personales</h2>
          <img src="../assets/huella.png" alt="huellaIcono" />
        </div>
        <div
          @click="this.$router.push('/contacto')"
          class="subElement"
          id="thirdOption"
        >
          <h2>Contacto</h2>
          <img src="../assets/contact-mail.png" alt="EmailIcono" />
        </div>
        <div
          @click="this.$router.push('/guiadecompra')"
          class="subElement"
          id="fourthOption"
        >
          <h2>Guía de Compra</h2>
          <img src="../assets/infoIcon.png" alt="infoIcono" />
        </div>
      </div>
      <div class="separadorBlack"></div>

      <input
        @click="logOut"
        class="nextButtonSubmit"
        type="button"
        value="CERRAR SESIÓN"
      />
    </div>
  </div>
</template>
<script>
import { signOut, auth } from "@/auth/firebaseConfig.js";
/*eslint-disable */
export default {
  name: "RightDesktopMenu",
  mounted() {
    if (this.selectedOption !== null) {
      document.getElementById(this.selectedOption).classList.add("usOption");
    }
  },
  data() {
    return {};
  },
  props: {
    userData: Object,
    selectedOption: String,
  },
  methods: {
    async logOut() {
      await signOut(auth)
        .then(() => {
          this.$store.commit("setCurrentAuth", false);
          this.$store.commit("setCurrentUser", null);
          this.$store.commit("setCurrentCartLength", null);
          this.$store.commit("setCurrentMail", null);
          this.$router.push("/");
        })
        .catch((error) => {
          ("ALGO OCURRIO");
        });
    },
  },
};
</script>
<style lang="scss">
@import "../styles/components/RightDesktopMenu.scss";
</style>
