<template>
  <div class="generalContainers">
    <div>
      <div @click="menuAction(true)" class="areaClick"></div>
      <input @click="check" id="menu__toggle" type="checkbox" />

      <label
        v-if="this.colorBoton === 'Dark'"
        class="menu__btn blackSpan headerHoverLabel"
        for="menu__toggle"
      >
        <span class="blackSpan headerHoverLabel"></span>
      </label>

      <label
        v-else
        class="menu__btn whiteSpan headerHoverLabel"
        for="menu__toggle"
      >
        <span class="headerHoverLabel"></span>
      </label>

      <ul class="menu__box">
        <div class="itemsBox">
          <li><a class="menu__item" href="#">Inicio</a></li>
          <li><a class="menu__item" href="#">Sobre Nosotros</a></li>
          <li><a class="menu__item" href="#">Contacto</a></li>
          <li><a class="menu__item" href="#">Productos</a></li>
          <li><a class="menu__item" href="#">Método de Pago</a></li>
          <div @click="menuAction(false)" class="greyContainer"></div>
        </div>
      </ul>
    </div>
    <!--<div class="opacity"></div>-->
  </div>
</template>
<script>
export default {
  /*eslint-disable */
  created() {
    this.colorBoton = this.menuButtonColor;
    if (this.color === "Dark") {
      document.documentElement.style.setProperty("--baseColor", "black");
      document.documentElement.style.setProperty("--secondColor", "white");
    }
    if (this.color === "blanco") {
      document.documentElement.style.setProperty("--baseColor", "white");
      document.documentElement.style.setProperty("--secondColor", "black");
    }
  },
  data() {
    return {
      isOpened: false,

      colorBoton: null,
    };
  },

  name: "MenuGeneral",
  props: {
    color: "String",
    menuButtonColor: "String",
  },
  methods: {
    check() {
      const pageBody = document.querySelector("body");
      pageBody.classList.toggle("bodyStyle");
    },
    menuAction(bool) {
      debugger;
      document.querySelector("#menu__toggle").checked = bool;
      if (bool === true) {
        this.isOpened = true;
      }
      if (bool === false) {
        this.isOpened = false;
      }
      this.check();
    },
  },
  watch: {
    color: function (newVal, oldVal) {
      if (newVal === "blanco") {
        document.documentElement.style.setProperty("--baseColor", "white");
        document.documentElement.style.setProperty("--secondColor", "black");
      }
    },
    isOpened: function (newVal, oldVal) {
      this.$store.commit("setCurrentFilterMenu", newVal);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";

@include headerIconHover;

$baseColor: white;
$secondColor: black;

.bodyStyle {
  overflow: hidden;
}

@include estiloMenus("#menu__toggle", ".menu__btn", ".menu__box");

//ESTA CLASE SOLO PONDRA EL SPAN NEGRO CUANDO TENGAMOS EL HEADER SECUNDARIO DEL MENU ABIERTO
.blackSpan {
  span,
  span::before,
  span::after {
    background-color: black;
  }
}

.menu__item {
  display: block;
  padding: 12px 24px;
  color: #333;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition-duration: 0.25s;
}
.menu__item:hover {
  background-color: #cfd8dc;
}
@media (min-width: 900px) and (max-width: 1430px) {
  .menu__box {
    width: 31%;
  }
  #menu__toggle:checked ~ .menu__box .greyContainer {
    left: 31% !important;
  }
}
@media (min-width: 701px) and (max-width: 899px) {
  .menu__box {
    width: 50%;
  }
  #menu__toggle:checked ~ .menu__box .greyContainer {
    left: 50% !important;
  }
}

@media (min-width: 300px) and (max-width: 700px) {
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

  .menu__box {
    width: 100%;
  }
  .greyContainer {
    display: none;
  }
}
</style>
