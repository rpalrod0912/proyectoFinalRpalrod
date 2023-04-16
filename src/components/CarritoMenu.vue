<template>
  <input id="CarritoMenu__toggle" type="checkbox" name="checkBusqueda" />

  <label @click="menuAction(true)" for="checkBusqueda">
    <img :src="this.modo" />
  </label>

  <ul class="CarritoMenu__box">
    <div v-if="checked">
      <div class="cabeceraMenu">
        <input type="checkbox" name="cartCheck" id="cartCheck" />

        <label
          @click="toggleTab('#cartCheck')"
          class="labelCarrito"
          for="cartCheck"
        >
          <div class="grupoFlex">
            <img src="../assets/bolso.png" />
            <p>CARRITO (0)</p>
          </div>

          <div class="marcador"></div>
        </label>
        <input type="checkbox" name="likeCheck" id="likeCheck" />

        <label
          @click="toggleTab('#likeCheck')"
          class="labelUnchecked"
          for="likeCheck"
        >
          <img src="../assets/likeWhite.png" />
          <p>WISHLIST (0)</p>
        </label>
        <div class="closeDiv" @click="menuAction(false)">
          <img :src="this.deleteIcon" />
        </div>
      </div>
      <div class="contenidoCarrito">
        <p class="textoP">TU CESTA ESTA VACÍA</p>
        <button class="seeProductsButton">VER PRODUCTOS</button>
      </div>
    </div>
    <div v-else-if="!checked">
      <div class="cabeceraMenu">
        <input type="checkbox" name="cartCheck" id="cartCheck" />

        <label
          @click="toggleTab('#cartCheck')"
          class="labelUnchecked"
          for="cartCheck"
        >
          <img src="../assets/bolso.png" />
          <p>CARRITO (0)</p>
        </label>
        <input type="checkbox" name="likeCheck" id="likeCheck" />

        <label class="labelCarrito" for="likeCheck">
          <div class="grupoFlex">
            <img src="../assets/likeWhite.png" />
            <p>WISHLIST (0)</p>
          </div>
          <div class="marcador"></div>
        </label>
        <div class="closeDiv" @click="menuAction(false)">
          <img :src="this.deleteIcon" />
        </div>
      </div>
      <div class="contenidoCarrito">
        <p class="textoP">TU WISHLIST ESTA VACÍA</p>
        <button class="seeProductsButton">VER PRODUCTOS</button>
      </div>
    </div>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
</template>
<script>
export default {
  /*eslint-disable */
  created() {
    if (this.color === "Dark") {
      this.modo = this.bolsoOscuro;
      this.deleteIcon = this.deleteOscuro;
    } else {
      this.modo = this.bolsoClaro;
      this.deleteIcon = this.deleteClaro;
    }
    this.checked = "#cartCheck";
  },
  mounted() {
    debugger;

    this.toggleTab(this.checked);
  },
  name: "CarritoMenu",
  props: {
    color: String,
  },
  methods: {
    menuAction(bool) {
      const pageBody = document.querySelector("body");
      debugger;
      document.querySelector("#CarritoMenu__toggle").checked = bool;
      if (bool === true) {
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "0";
        pageBody.classList.add("bodyStyle");
      }
      if (bool === false) {
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "1";
        pageBody.classList.remove("bodyStyle");
      }

      console.log("estilos");
      /*
          if (document.getElementById("TopMenu__toggle").checked) {
            alert("checked");
          } else {box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.28);k it! Let me check it for you.");
          }
          */
    },
    toggleTab(selectorName) {
      debugger;
      if (selectorName === "#cartCheck") {
        //document.querySelector("Checked").className = "labelCarrito";
        console.log(document.querySelector(selectorName));
        document.querySelector(selectorName).checked = true;
        this.checked = true;
        console.log(this.checked);

        document.querySelector("#likeCheck").checked = false;
        //document.querySelector("label[for=likeCheck]").className =
        ("labelUnchecked");
      } else if (selectorName === "#likeCheck") {
        /*document.querySelector("label[for=likeCheck]").className =
          "labelCarrito";*/
        console.log(document.querySelector(selectorName));
        document.querySelector(selectorName).checked = true;
        this.checked = false;
        console.log(this.checked);

        document.querySelector("#cartCheck").checked = false;

        /*document.querySelector("label[for=cartCheck]").className =
          "labelUnchecked";*/
      }
    },
  },
  data() {
    return {
      modo: null,
      deleteIcon: null,
      checked: null,
      selected: null,
      bolsoClaro: require("../assets/bolsoBlanco.png"),
      bolsoOscuro: require("../assets/bolso.png"),
      deleteClaro: require("../assets/DeleteIcon.png"),
      deleteOscuro: require("../assets/DeleteIcon.png"),
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";

.grupoFlex {
  flex-direction: row;
}
.marcador {
  width: 115%;
  height: 1px;
  border: 1px solid black;
  background-color: black;
  position: absolute;
  bottom: 0;
}
.cabeceraMenu {
  display: flex;
  width: 100%;
  align-items: center;
  img {
    width: 2rem;
    height: 2rem;
    position: relative;
    left: 10%;
    bottom: 1%;
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.28);
}
.textoP {
  font-size: 2rem;
  @include fuenteSemiBold;
}
#checkedBusqueda {
  display: none;
}
.searchMenu {
  cursor: pointer;
}
.seeProductsButton {
  padding-top: 5rem;
  margin-top: 2rem;
  width: 18rem;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  font-size: 1.4rem;
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  margin-top: 5rem;
  margin-bottom: 1rem;
}
.bodyStyle {
  overflow: hidden;
}
@include carritoMenuDerecho(
  "#CarritoMenu__toggle",
  ".menu__btn",
  ".CarritoMenu__box"
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
#cartCheck,
#likeCheck {
  z-index: 1;
  width: 1rem;
  position: relative;
  right: -1rem;
  opacity: 0;
  label {
    background-color: grey;
  }
}
.contenidoCarrito {
  display: flex;
  padding-top: 5rem;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80%;

  label {
    width: 60%;
    text-align: left;
  }
}
.labelUnchecked {
  width: 40%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #95a3a4;
  border: 2px solid black;
  opacity: 0.6;
  img {
    padding-right: 2rem;
  }
  @include fuenteSemiBold;
}
.labelCarrito {
  position: relative;
  width: 40%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  img {
    padding-right: 2rem;
  }
  @include fuenteSemiBold;
}
.closeDiv {
  display: flex;
  width: 20%;
  justify-content: center;
}
@media (min-width: 900px) and (max-width: 1430px) {
  .menu__box {
    width: 31%;
  }
  #menu__toggle:checked ~ .CarritoMenu__box .greyContainer {
    left: 31% !important;
  }
}
@media (min-width: 600px) and (max-width: 899px) {
  .CarritoMenu__box {
    width: 50%;
  }

  #CarritoMenu__toggle:checked ~ .CarritoMenu__box .greyContainer {
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

  .CarritoMenu__box {
    width: 100%;
  }
  .greyContainer {
    display: none;
  }
}
</style>
