<template>
  <form @submit.prevent="submitRegister" class="registerWindow">
    <label for="firstNameInput">
      <h1>INTRODUCE TU NOMBRE</h1>
    </label>
    <div
      :class="v$.name.$error === true ? 'passwordInputError' : 'passwordInput'"
    >
      <input
        id="firstNameInput"
        name="firstNameInput"
        type="text"
        placeholder="Nombre"
        v-model="this.name"
      />
    </div>
    <span class="alertText" v-if="v$.name.$error"
      >El nombre es obligatorio y debe contener al menos 3 caracateres</span
    >
    <label for="lastNameInput">
      <h1>INTRODUCE TUS APELLIDOS</h1>
    </label>
    <div
      :class="
        v$.lastName.$error === true ? 'passwordInputError' : 'passwordInput'
      "
    >
      <input
        id="lastNameInput"
        name="lastNameInput"
        type="text"
        placeholder="Apellidos"
        v-model="this.lastName"
      />
    </div>
    <span class="alertText" v-if="v$.lastName.$error"
      >Los apellidos deben contener al menos 6 carácteres</span
    >
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
    <div
      :class="
        v$.password.password.$error === true
          ? 'passwordInputError'
          : 'passwordInput'
      "
    >
      <input
        id="passInput"
        name="passInput"
        type="text"
        placeholder="Contraseña"
        v-model="this.password.password"
      />
    </div>
    <span class="alertText" v-if="v$.password.password.$error"
      >La contraseña debe tener como minimo 8 caracteres, una letra mayuscula,
      una minuscula, y un carácter especial.
    </span>
    <label for="repPassInput">
      <h1>REPITE TU CONTRASEÑA</h1>
    </label>
    <div
      :class="
        v$.password.confirmPwd.$error === true
          ? 'passwordInputError'
          : 'passwordInput'
      "
    >
      <input
        id="repPassInput"
        name="repPassInput"
        type="text"
        placeholder="Contraseña"
        v-model="this.password.confirmPwd"
      />
    </div>
    <span class="alertText" v-if="v$.password.confirmPwd.$error"
      >La contraseña deben ser iguales
    </span>

    <label for="repPassInput"> <h1>INTRODUCE TU NÚMERO DE TELÉFONO</h1> </label>
    <div
      :class="
        v$.phoneNumber.$error === true ? 'passwordInputError' : 'passwordInput'
      "
    >
      <input
        id="phoneInput"
        name="phoneInput"
        type="text"
        placeholder="+6XXXXXXX"
        v-model="this.phoneNumber"
      />
    </div>
    <span class="alertText" v-if="v$.phoneNumber.$error"
      >El número es incorrecto, verifica que solo tiene numeros decimales y no
      supera la longiutd de 9 caracteres</span
    >
    <span class="alertText" v-if="userFound"
      >Por favor, usa un correo distinto, ese ya existe
    </span>
    <input class="registerSubmit" type="submit" />
  </form>
</template>
<script>
/*eslint-disable */
import {
  app,
  auth,
  createUserWithEmailAndPassword,
} from "@/auth/firebaseConfig.js";
import { API_URL, toHome } from "@/helpers/basicHelpers";
import useValidate from "@vuelidate/core";
import axios from "axios";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
  numeric,
  helpers,
} from "@vuelidate/validators";

const passwordRegex = helpers.regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
);

export default {
  name: "RegisterComponent",
  created() {
    if (document.querySelector("body").classList.contains("bodyStyle")) {
      document.querySelector("body").classList.toggle("bodyStyle");
    }
  },
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
      userFound: false,
      exito: false,
      reload: toHome,
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
      lastName: { required, maxLength: minLength(6) },
      email: { required, email },
      password: {
        password: { required, passwordRegex },
        confirmPwd: { required, sameAs: sameAs(this.password.password) },
      },
      phoneNumber: {
        required,
        numeric,
        minLength: minLength(9),
        maxLength: maxLength(9),
      },
    };
  },
  methods: {
    async submitRegister() {
      debugger;
      this.v$.$touch();

      this.v$.$validate();
      console.log(this.v$);
      debugger;
      console.log(this.v$.$error);
      if (!this.v$.$error) {
        await this.registerFireBase();
        if (this.exito === true) {
          this.$router.push({
            name: "Inicio",
            query: { recienRegistrado: "SI" },
          });
        }
      } else {
        alert("FORM FAILED VALIDAT");
      }
    },
    async registerFireBase() {
      debugger;
      const registerData = {
        name: this.name,
        lastName: this.lastName,
        mail: this.email,
        password: this.password.password,
      };
      console.log(auth);
      console.log(registerData.mail);
      console.log(registerData.password);

      await createUserWithEmailAndPassword(
        auth,
        registerData.mail,
        registerData.password
      )
        .then((userCredential) => {
          debugger;
          this.exito = true;
          this.userFound = false;
          const user = userCredential;
          const userId = userCredential.user.uid;
          this.postForm({
            id: userId,
            name: registerData.name,
            lastName: registerData.lastName,
            mail: registerData.mail,
            password: registerData.password,
          });
          const usuario = userCredential.user;
          if (localStorage.getItem(`carrito_${usuario.email}`) === null) {
            localStorage.setItem(
              `carrito_${usuario.email}`,
              JSON.stringify({ userId: usuario.uid, cesta: [] })
            );
            ("CREADO!!");
          }
          //this.encontrarUsuario(usuario.email);
          this.$store.commit("setCurrentMail", usuario.email);
          ("NO CREADO YA EXISTE");
        })
        .catch((error) => {
          debugger;
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
            this.exito = false;
            this.userFound = true;
            return;
          }
        });
    },
    async postForm(objetoUsuario) {
      debugger;
      objetoUsuario;
      const data = await axios
        .post(`${API_URL}users/`, objetoUsuario)
        .then((res) => res.data)
        .catch((error) => error);
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
