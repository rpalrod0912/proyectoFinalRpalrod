<template>
  <input id="RightMenu__toggle" type="checkbox" name="checkBusqueda" />

  <label @click="menuAction(true)" for="checkBusqueda">
    <img :src="this.modo" />
  </label>

  <ul class="RightMenu__box">
    <div class="cabeceraMenu">
      <h1 class="TopMenu__item textoGruesoh1">ACCEDER</h1>
      <img @click="menuAction(false)" :src="this.deleteIcon" />
    </div>
    <div class="contenidoLogin">
      <label for="emailPhoneInput" class="TopMenu__item textoGruesoh1">
        INTRODUCE TU NÚMERO DE TELÉFONO O E-MAIL
      </label>
      <input
        id="emailPhoneInput"
        name="emailPhoneInput"
        placeholder="Email/Número Móvil"
        type="text"
      />
      <button class="nextButton">SIGUIENTE</button>
      <p class="TopMenu__item textoPlanoFino">O si lo prefieres</p>
      <button class="socialButton">
        <img src="../assets/gmail.png" />
        <p>CONTINUAR CON GMAIL</p>
      </button>
      <button class="socialButton">
        <img src="../assets/facebook.png" />
        <p>CONTINUAR CON FACEBOOK</p>
      </button>

      <p class="TopMenu__item textoPlanoFino">
        Al iniciar sesión con mi login social, acepto vincular mi cuenta
        conforme a la Política de Privacidad
      </p>
      <p class="TopMenu__item textoPlanoFino">
        Utilizaremos el teléfono / correo electrónico indicado para enviar el
        código de verificación.
      </p>
    </div>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
</template>
<script>
export default {
  /*eslint-disable */
  created() {
    if (this.color === "Dark") {
      this.modo = this.UserOscuro;
      this.deleteIcon = this.deleteOscuro;
    } else {
      this.modo = this.UserClaro;
      this.deleteIcon = this.deleteClaro;
    }
  },
  name: "LoginMenu",
  props: {
    color: String,
  },
  methods: {
    menuAction(bool) {
      debugger;
      const pageBody = document.querySelector("body");
      pageBody.classList.toggle("bodyStyle");
      document.querySelector("#RightMenu__toggle").checked = bool;
      if (bool === true) {
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "0";
      }
      if (bool === false) {
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "1";
      }

      console.log("estilos");
      /*
        if (document.getElementById("TopMenu__toggle").checked) {
          alert("checked");
        } else {box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.28);k it! Let me check it for you.");
        }
        */
    },
  },
  data() {
    return {
      modo: null,
      deleteIcon: null,
      UserClaro: require("../assets/usuario.png"),
      UserOscuro: require("../assets/blackUser.png"),
      deleteClaro: require("../assets/DeleteIcon.png"),
      deleteOscuro: require("../assets/DeleteIcon.png"),
    };
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

.socialButton {
  @include loginButton("#DADADA", "black", "0.6rem;");
  font-size: 1rem;
  justify-content: flex-start;
  img {
    padding-right: 0.4rem;
  }
  padding-top: 1.8rem;
  padding-bottom: 1.8rem;
}
.nextButton {
  @include loginButton("black", "white", "2rem");
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.contenidoLogin {
  display: flex;

  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80%;

  label {
    width: 60%;
    text-align: left;
  }

  input[type="text"],
  input[type="text"]:focus {
    margin-top: 2rem;
    height: 2.5rem;
    background: transparent;
    border: 1px solid black;
    border-radius: 10px;
    padding-left: 2rem;
    @include fuenteSemiBold;
    font-size: 1rem;
  }
}
.cabeceraMenu {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  img {
    width: 2rem;
    height: 2rem;
    position: relative;
    left: 10%;
    bottom: 1%;
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.28);
}

#checkedBusqueda {
  display: none;
}
.searchMenu {
  cursor: pointer;
}

.bodyStyle {
  overflow: hidden;
}
@include estiloMenuDerecho(
  "#RightMenu__toggle",
  ".menu__btn",
  ".RightMenu__box"
);

.TopMenu__item {
  padding: 12px 24px;
  margin-top: 0.5rem;
}
.textoPlano {
  margin-left: 9%;
  margin-right: 9%;
  @include fuenteSemiBold;
  color: #95a3a4;
  font-size: 1.2rem;
}
.textoPlanoFino {
  @include fuenteSemiBold;
  color: black;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.textoGrueso {
  margin-left: 9%;
  margin-right: 9%;
  @include fuenteSemiBold;
  color: black;
  font-size: 1.8rem;
}
.textoGruesoh1 {
  margin-left: 9%;
  margin-right: 9%;
  @include fuenteSemiBold;
  color: black;
  font-size: 1.3rem;
  text-align: center;
}
@media (min-width: 900px) and (max-width: 1430px) {
  .RightMenu__box {
    width: 31%;
  }
  #RightMenu__toggle:checked ~ .RightMenu__box .greyContainer {
    left: 0% !important;
    width: 69%;
  }
}
@media (min-width: 600px) and (max-width: 899px) {
  .RightMenu__box {
    width: 50%;
  }

  #RightMenu__toggle:checked ~ .RightMenu__box .greyContainer {
    left: -10% !important;
  }
}

@media (min-width: 300px) and (max-width: 599px) {
  .itemsBox {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    li {
      position: relative;
      right: auto;
      margin: 1rem;
    }
  }

  .RightMenu__box {
    width: 100%;
  }
  .greyContainer {
    display: none;
  }
}
</style>
