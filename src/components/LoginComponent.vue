<template>
  <section class="loginWindow">
    <label for="loginPasswordInp">
      <h1 v-if="this.loginMode === 'sms' || this.loginMode === 'mail'">
        CÓDIGO DE VERIFICACÓN
      </h1>
      <h1 v-else>INTRODUCE TU CONTRASEÑA</h1>
    </label>
    <p v-if="this.loginMode === 'sms'" class="pDescrip">
      Introduce el código que te hemos enviado al SMS al número de teléfono
      +34XXXXXXXX
    </p>
    <p v-else-if="this.loginMode === 'mail'" class="pDescrip">
      Introduce el código que te hemos enviado por e-mail a ********02@gmail.com
    </p>
    <div class="passwordInput">
      <input type="password" placeholder="Contraseña" id="loginInput" />

      <img
        v-if="!this.modoTexto"
        @click="showPassword()"
        src="../assets/blindIcon.png"
      />
      <img
        v-else-if="this.modoTexto"
        @click="showPassword()"
        src="../assets/SeeThrough.png"
      />
    </div>
    <ButtonComponent class="btn" msj="SIGUIENTE"></ButtonComponent>
    <ButtonComponent
      v-if="this.loginMode !== 'password'"
      class="btn"
      msj="No he recibido el código"
    ></ButtonComponent>
    <ButtonComponent
      v-if="this.loginMode === 'password'"
      class="colorBtnSoc btn"
      msj="Acceder con código vía SMS"
    ></ButtonComponent>
    <ButtonComponent
      v-if="this.loginMode === 'password'"
      class="colorBtnSoc btn"
      msj="Acceder con código vía e-mail"
    ></ButtonComponent>
    <p v-if="this.loginMode === 'password'" class="underLineTxt">
      Restablecer Contraseña
    </p>
    <p v-else-if="this.loginMode !== 'password'" class="underLineTxt">
      Acceder con contraseña
    </p>
    <p v-if="this.loginMode === 'sms'" class="underLineTxt">
      Acceder con código vía e-mail
    </p>
    <p v-if="this.loginMode === 'mail'" class="underLineTxt">
      Acceder con código vía SMS
    </p>
  </section>
</template>
<script>
import ButtonComponent from "./ButtonComponent.vue";

export default {
  created() {
    this.modoTexto = false;
    this.loginMode = this.loginModeProp;
  },
  data() {
    return {
      modoTexto: null,
      mostrarTexto: require("../assets/SeeThrough.png"),
      ocultarTexto: require("../assets/blindIcon.png"),
      loginMode: null,
    };
  },
  name: "LoginApp",
  methods: {
    showPassword() {
      let element = document.querySelector("#loginInput");
      if (element.type === "password") {
        element.type = "text";
        this.modoTexto = true;
      } else {
        element.type = "password";
        this.modoTexto = false;
      }
    },
  },
  components: { ButtonComponent },
  props: {
    loginModeProp: String,
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";
.colorBtnSoc {
  background-color: #dadada;
  border: 1px white;
  p {
    color: black;
  }
}
.pDescrip {
  font-size: 1.5rem;
  width: 70%;
  text-align: center;
  color: black;
  @include fuenteRegular;
  padding-bottom: 2rem;
}
.loginWindow {
  @include formWindow;
}
</style>
