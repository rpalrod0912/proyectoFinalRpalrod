<template>
  <div class="generalContainers">
    <div>
      <div @click="menuAction(true)" class="areaClick"></div>
      <input @click="check" id="menu__toggle" type="checkbox" />
      <label class="menu__btn" for="menu__toggle">
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
    console.log(this.color);
    if (this.color === "Dark") {
      document.documentElement.style.setProperty("--baseColor", "black");
      document.documentElement.style.setProperty("--secondColor", "white");
    }
  },
  name: "MenuGeneral",
  props: {
    color: "String",
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
$baseColor: white;
$secondColor: black;

.bodyStyle {
  overflow: hidden;
}

.areaClick {
  z-index: auto;
  height: 60%;
  width: 9%;
  position: absolute;
  left: 1vw;
  top: 2vw;
  cursor: pointer;
}

#menu__toggle {
  z-index: 1;
  width: 1rem;
  position: relative;
  right: -1rem;
  opacity: 0;
}
#menu__toggle:checked + .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked + .menu__btn > span::before {
  top: 0;
  transform: rotate(0deg);
  background-color: $secondColor;
}
#menu__toggle:checked + .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
  background-color: $secondColor;
  .greyContainer {
    visibility: visible;
  }
}
#menu__toggle:checked ~ .menu__box {
  left: 0 !important;
  .greyContainer {
    left: 20% !important;
  }
}

.menu__btn {
  position: fixed;

  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 1;
}
.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: var(--baseColor, $baseColor);
  transition-duration: 0.25s;
}
.menu__btn > span::before {
  content: "";
  top: -8px;
}
.menu__btn > span::after {
  content: "";
  top: 8px;
}
.menu__box {
  display: block;
  position: fixed;
  top: 0;
  left: -100%;
  //width: 300px;
  width: 20%;
  height: 100%;
  margin: 0;
  padding: 80px 0;
  list-style: none;
  background-color: $baseColor;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  transition-duration: 0.25s;
  opacity: 1;
  .greyContainer {
    left: auto;
    background-color: $secondColor;
    position: fixed;
    left: -100%;
    width: 80%;
    height: 300rem;
    z-index: 1;
    bottom: 0%;
    opacity: 0.6;
    transition-duration: 0.25s;
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
