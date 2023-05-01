<template>
  <WhiteHeader tipo="Dark"> </WhiteHeader>
  <main>
    <!--
        loginModeProp="password"//Muestra Pantalla con contraseña
        loginModeProp="sms"//Muestra Pantalla con acceso codigo sms
        loginModeProp="mail"//Muestra Pantalla con acceso codigo movil
      -->
    <LoginAlternateComponent
      loginModeProp="AlternatePassword"
    ></LoginAlternateComponent>
  </main>
</template>
<script>
import LoginComponent from "@/components/LoginComponent.vue";
import WhiteHeader from "@/components/WhiteHeader.vue";
import { scrollTop } from "@/helpers/basicHelpers";
export default {
  /*eslint-disable */
  created() {
    scrollTop();
  },
  name: "LoginApp",
  components: { WhiteHeader, LoginAlternateComponent },
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
