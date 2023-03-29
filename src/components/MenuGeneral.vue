<template>
  <div class="generalContainers">
    <div>
      <div @click="menuAction(true)" class="areaClick"></div>
      <input @click="check" id="menu__toggle" type="checkbox" />

      <label
        v-if="this.colorBoton === 'Dark'"
        class="menu__btn blackSpan"
        for="menu__toggle"
      >
        <span class="blackSpan"></span>
      </label>

      <label v-else class="menu__btn whiteSpan" for="menu__toggle">
        <span></span>
      </label>

      <ul class="menu__box">
        <div>
          <li><a class="menu__item" href="#">Home</a></li>
          <li><a class="menu__item" href="#">About</a></li>
          <li><a class="menu__item" href="#">Team</a></li>
          <li><a class="menu__item" href="#">Contact</a></li>
          <li><a class="menu__item" href="#">Twitter</a></li>
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
    debugger;
    this.colorBoton = this.menuButtonColor;
    if (this.color === "Dark") {
      document.documentElement.style.setProperty("--baseColor", "black");
      document.documentElement.style.setProperty("--secondColor", "white");
    }
  },
  data() {
    return {
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
      document.querySelector("#menu__toggle").checked = bool;
    },
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

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
</style>
