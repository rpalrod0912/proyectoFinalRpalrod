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
          <div class="separadorNoMargin"></div>
          <li>
            <a @click="this.$router.push('/')" class="menu__item">Inicio</a>
          </li>
          <div class="separadorNoMargin"></div>
          <li>
            <a @click="this.$router.push('/guiadecompra')" class="menu__item"
              >Ayuda</a
            >
          </li>
          <div class="separadorNoMargin"></div>
          <li>
            <a @click="this.$router.push('/Contacto')" class="menu__item"
              >Contacto</a
            >
          </li>
          <div class="separadorNoMargin"></div>
          <li>
            <a @click="this.$router.push('/products')" class="menu__item"
              >Productos</a
            >
          </li>
          <div class="separadorNoMargin"></div>
          <li>
            <a @click="this.$router.push('/tuinformacion')" class="menu__item"
              >Tu Cuenta</a
            >
          </li>
          <div @click="menuAction(false)" class="greyContainer"></div>
          <div class="separadorNoMargin"></div>
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
@import "../styles/layout/MenuGeneral.scss";
</style>
