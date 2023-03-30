<template>
  <input id="RightMenu__toggle" type="checkbox" name="checkBusqueda" />

  <label @click="menuAction(true)" for="checkBusqueda">
    <img :src="this.modo" />
  </label>

  <ul class="RightMenu__box">
    <div class="cajaBusqueda">
      <div class="lineaBusqueda">
        <img src="../assets/lupaBlack.png" />
        <input
          type="text"
          class="inputBusqueda"
          placeholder="¿QUÉ ESTÁS BUSCANDO?"
        />
      </div>
      <div class="separadorAlterno"></div>
    </div>
    <p class="TopMenu__item textoGrueso">Trending</p>
    <p class="TopMenu__item textoPlano">Sudadera Hombre Blanca</p>
    <p class="TopMenu__item textoPlano">Chaqueta Hombre</p>
    <p class="TopMenu__item textoPlano">Chaqueta Camiseta Blanca</p>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
</template>
<script>
export default {
  /*eslint-disable */
  created() {
    if (this.color === "Dark") {
      this.modo = this.UserOscuro;
    } else {
      this.modo = this.UserClaro;
    }
  },
  name: "LoginMenu",
  props: {
    color: String,
  },
  methods: {
    menuAction(bool) {
      debugger;
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
        } else {
          alert("You didn't check it! Let me check it for you.");
        }
        */
    },
  },
  data() {
    return {
      modo: null,
      UserClaro: require("../assets/usuario.png"),
      UserOscuro: require("../assets/blackUser.png"),
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
input[type="text"],
input[type="text"]:focus {
  background: transparent;
  border: none;
  outline-width: 0;
}
.cajaBusqueda {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  align-items: flex-start;
  img {
    width: 4rem;
    height: 4rem;
  }
  .lineaBusqueda {
    display: flex;
    flex-direction: row;
  }
  .inputBusqueda {
    padding-left: 2rem;
    @include fuenteSemiBold;
    font-size: 2rem;
    color: DADADA;
  }
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
.textoGrueso {
  margin-left: 9%;
  margin-right: 9%;
  @include fuenteSemiBold;
  color: black;
  font-size: 1.8rem;
}
.TopMenu__item:hover {
  background-color: #cfd8dc;
}
</style>
