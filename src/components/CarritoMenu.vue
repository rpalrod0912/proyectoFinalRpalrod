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
          <img src="../assets/bolso.png" />
          <p>CARRITO (0)</p>
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
        <img @click="menuAction(false)" :src="this.deleteIcon" />
      </div>
      <div class="contenidoLogin">
        <p v-if="this.checked">HOLA</p>
        <p v-if="!this.checked">HOLA2</p>
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
          <img src="../assets/likeWhite.png" />
          <p>WISHLIST (0)</p>
        </label>
        <img @click="menuAction(false)" :src="this.deleteIcon" />
      </div>
      <div class="contenidoLogin">
        <p>ESTA ES LA WISHLIST</p>
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
      debugger;
      document.querySelector("#CarritoMenu__toggle").checked = bool;
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

#checkedBusqueda {
  display: none;
}
.searchMenu {
  cursor: pointer;
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
.labelUnchecked {
  background-color: #95a3a4;
}
.labelCarrito {
  width: 40%;
  display: flex;
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
</style>
