<template>
  <WhiteHeader tipo="Dark"> </WhiteHeader>
  <PopUpModal
    :is-opened="true"
    v-if="this.showPopUp"
    msj="HAS INCIADO SESIÓN CON ÉXITO"
  ></PopUpModal>
  <PopUpModal
    :is-opened="true"
    v-if="this.showEmailWarning"
    msj="VERIFICA TU CORREO ELECTRÓNICO"
  >
  </PopUpModal>
  <main>
    <!--
      loginModeProp="password"//Muestra Pantalla con contraseña
      loginModeProp="sms"//Muestra Pantalla con acceso codigo sms
      loginModeProp="mail"//Muestra Pantalla con acceso codigo movil
    -->
    <!--
         <LoginComponent
      @changePopUpState="setToTrue"
      @emailVerified="setEmailWarning"

      loginModeProp="password"
    ></LoginComponent>
    -->
    <LoginComponent
      @changeLoginType="setLoginType"
      @changePopUpState="setToTrue"
      @emailVerified="setEmailWarning"
      :loginModeProp="this.changeLoginType"
      :userInput="this.dataValue"
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
    if (this.loginMode === "email") {
      this.dataValue = this.$route.query.email;
    }
    if (this.loginMode === "sms") {
      this.dataValue = this.$route.query.phone;
    }
  },
  data() {
    return {
      dataValue: this.$route.query.email,
      showPopUp: false,
      showEmailWarning: false,
      changeLoginType: this.loginMode,
    };
  },
  name: "LoginApp",
  components: { WhiteHeader, LoginComponent, PopUpModal },
  methods: {
    setToTrue(val) {
      this.showPopUp = val;
    },
    setEmailWarning(val) {
      this.showEmailWarning = val;
    },
    setLoginType(val) {
      this.changeLoginType = val;
    },
  },
  props: {
    loginMode: String,
    //Two Login Mode depends of user input, password or SMS code or mail code
  },
  watch: {
    changeLoginType: function (newVal, OldVal) {
      if (newVal === "mail") {
        this.changeLoginType = "mail";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  display: flex;
  flex-direction: column;
}
</style>
