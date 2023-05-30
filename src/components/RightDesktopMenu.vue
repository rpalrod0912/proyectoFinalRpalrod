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
        <div class="subElement" id="firstOption">
          <h2>Mis Compras</h2>
          <img src="../assets/Caja.png" />
        </div>
        <div class="subElement" id="secondOption">
          <h2>Datos Personales</h2>
          <img src="../assets/huella.png" />
        </div>
        <div class="subElement" id="thirdOption">
          <h2>Métodos de pago</h2>
          <img src="../assets/tarjeta.png" />
        </div>
        <div class="subElement" id="fourthOption">
          <h2>Política de Privacidad</h2>
          <img src="../assets/alertaPng.png" />
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
};
</script>
<style lang="scss">
@import "../styles/components/RightDesktopMenu.scss";
</style>
