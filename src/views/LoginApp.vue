<template>
  <WhiteHeader tipo="Dark"> </WhiteHeader>
  <PopUpModal
    :is-opened="true"
    v-if="this.showPopUp"
    msj="HAS INCIADO SESIÓN CON ÉXITO"
  ></PopUpModal>
  <main>
    <!--
      loginModeProp="password"//Muestra Pantalla con contraseña
      loginModeProp="sms"//Muestra Pantalla con acceso codigo sms
      loginModeProp="mail"//Muestra Pantalla con acceso codigo movil
    -->
    <LoginComponent
      @changePopUpState="setToTrue"
      loginModeProp="password"
    ></LoginComponent>
  </main>
</template>
<script>
import LoginComponent from "@/components/LoginComponent.vue";
import WhiteHeader from "@/components/WhiteHeader.vue";
import PopUpModal from "@/components/popUpModal.vue";
import { scrollTop } from "@/helpers/basicHelpers";
export default {
  /*eslint-disable */
  created() {
    scrollTop();
  },
  data() {
    return {
      showPopUp: false,
    };
  },
  name: "LoginApp",
  components: { WhiteHeader, LoginComponent, PopUpModal },
  methods: {
    setToTrue(val) {
      this.showPopUp = val;
    },
  },
  props: {
    //Two Login Mode depends of user input, password or SMS code or mail code
  },
};
</script>
<style lang="scss" scoped>
body {
  display: flex;
  flex-direction: column;
}
</style>
