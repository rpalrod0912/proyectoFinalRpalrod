<template>
  <form @submit.prevent="submitRegister" class="registerWindow">
    <label for="firstNameInput">
      <h1>INTRODUCE TU NOMBRE</h1>
    </label>
    <div class="passwordInput">
      <input
        id="firstNameInput"
        name="firstNameInput"
        type="text"
        placeholder="Nombre"
        v-model="this.name"
      />
    </div>
    <label for="lastNameInput">
      <h1>INTRODUCE TUS APELLIDOS</h1>
    </label>
    <div class="passwordInput">
      <input
        id="lastNameInput"
        name="lastNameInput"
        type="text"
        placeholder="Apellidos"
        v-model="this.lastName"
      />
    </div>
    <label for="lastNameInput">
      <h1>INTRODUCE TU CORREO</h1>
    </label>
    <div
      :class="v$.email.$error === true ? 'passwordInputError' : 'passwordInput'"
    >
      <input
        id="lastNameInput"
        name="lastNameInput"
        type="text"
        placeholder="ejemplo@gmail.com"
        v-model="email"
      />
      <span class="alertText" v-if="!v$.email.required"
        >El correo es Obligatorio</span
      >
    </div>
    <span class="alertText" v-if="v$.email.$error"
      >Por favor Introduce el correo de la siguiente manera<br />
      ejemplo@dominio.com
    </span>
    <label for="passInput">
      <h1>CREA TU CONTRASEÑA</h1>
    </label>
    <div class="passwordInput">
      <input
        id="passInput"
        name="passInput"
        type="text"
        placeholder="Contraseña"
        v-model="this.password.password"
      />
    </div>

    <label for="repPassInput">
      <h1>REPITE TU CONTRASEÑA</h1>
    </label>
    <div class="passwordInput">
      <input
        id="repPassInput"
        name="repPassInput"
        type="text"
        placeholder="Contraseña"
        v-model="this.password.confirmPwd"
      />
    </div>

    <label for="repPassInput"> <h1>INTRODUCE TU NÚMERO DE TELÉFONO</h1> </label>
    <div class="passwordInput">
      <input
        id="phoneInput"
        name="phoneInput"
        type="text"
        placeholder="+6XXXXXXX"
        v-model="this.phoneNumber"
      />
    </div>

    <input @click="submitRegister" class="registerSubmit" type="submit" />
  </form>
</template>
<script>
/*eslint-disable */
import useValidate from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";

export default {
  name: "RegisterComponent",

  data() {
    return {
      //v$ es un estandar a la hora de trabjar con Vuelidate
      v$: useValidate(),
      name: "",
      lastName: "",
      email: "",
      password: {
        password: "",
        confirmPwd: "",
      },
      phoneNumber: "",
    };
  },
  validations() {
    return {
      name: { required },
      lastName: { required },
      email: { required, email },
      password: {
        password: { required },
        confirmPwd: { required },
      },
      phoneNumber: { required },
    };
  },
  methods: {
    submitRegister() {
      debugger;
      this.v$.$touch();
      /*
      this.v$.$validate();
      console.log(this.v$);
      console.log(this.v$.$error);
      if (!this.v$.$error) {
        alert("FORM SUBMITED");
      } else {
        alert("FORM FAILED VALIDAT");
      }
      */
    },
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";
.alertText {
  @include fuenteRegular;
  font-size: 1.2em;
  color: red;
  padding-bottom: 1.2em;
  text-align: center;
}
.registerWindow {
  @include formWindow;
  input[type="password"],
  input[type="password"]:focus,
  input[type="text"],
  input[type="password"]:focus {
    margin-bottom: 2rem;
  }
  .registerSubmit {
    @include loginButton("black", "white", 3rem);
    height: 3.5rem;
    padding-top: 0rem;
    padding-bottom: 0rem;
    margin-bottom: 3rem;
  }
}
@media (max-width: 800px) {
  .genericButton {
    width: 17rem;
  }
  .registerWindow {
    top: 10rem;
    h1 {
      text-align: center;
      font-size: 1.3em;
      width: 99%;
    }
  }
  .pDescrip {
    font-size: 1.1em;
  }
}
</style>
