<template>
  <section class="loginWindow">
    <label for="loginPasswordInp">
      <h1>INTRODUCE TU CONTRASEÑA</h1>
    </label>
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
      class="btn"
      msj="Acceder con código vía SMS"
    ></ButtonComponent>
    <ButtonComponent
      class="btn"
      msj="Acceder con código vía e-mail"
    ></ButtonComponent>
    <p class="underLineTxt">Restablecer Contraseña</p>
  </section>
</template>
<script>
import ButtonComponent from "./ButtonComponent.vue";

export default {
  created() {
    this.modoTexto = false;
  },
  data() {
    return {
      modoTexto: null,
      mostrarTexto: require("../assets/SeeThrough.png"),
      ocultarTexto: require("../assets/blindIcon.png"),
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
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";
.loginWindow {
  display: flex;
  position: relative;
  top: 18rem;
  flex-direction: column;
  align-items: center;
  .underLineTxt {
    margin-top: 2.5rem;
    text-decoration: underline;
    @include fuenteRegular;
    font-size: 1rem;
  }
  .btn {
    margin-top: 2rem;
  }
  h1 {
    @include fuenteBold;
    font-size: 2.3rem;
    color: black;
    padding-bottom: 2rem;
  }
  .passwordInput {
    display: flex;
    align-items: flex-end;
    align-items: center;
    width: 18rem;

    input[type="password"],
    input[type="password"]:focus,
    input[type="text"],
    input[type="password"]:focus {
      position: relative;
      height: 2.5rem;
      background: transparent;
      border: 1px solid black;
      border-radius: 10px;
      padding-left: 2rem;
      @include fuenteSemiBold;
      font-size: 1rem;
      align-items: flex-end;
    }
    img {
      width: 2.1rem;
      height: 2rem;
      position: relative;
      right: 3rem;
    }
  }
}
</style>
