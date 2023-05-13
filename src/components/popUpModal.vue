<template>
  <div v-if="isOpen" @click="this.isOpen = false" class="outsideClick"></div>

  <input type="checkbox" v-model="isOpen" id="popMenu__toggle" />

  <ul id="menuBox" class="popMenu__box">
    <div class="popMenu__item textoGuresoh1">
      <div @click="this.isOpen = false" class="hoverBox">
        <img class="closeModal" src="@/assets/DeleteIcon.png" />
      </div>

      <img src="@/assets/checked.png" />
      <p>{{ msj }}</p>
    </div>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      isOpen: this.isOpened,
    };
  },
  name: "popUpModal",
  props: {
    msj: String,
    isOpened: Boolean,
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
@include popUpModal("#popMenu__toggle", ".menu__btn", ".popMenu__box");
.popMenu__item {
  display: flex;
  align-items: center;
  flex-direction: column;
  //padding: 12px 24px;
  //margin-top: 0.5rem;
}
.outsideClick {
  position: absolute;
  width: 100%;
  z-index: 1;
  background-color: #6e7272;
  opacity: 0.6;
  height: 363%;
  top: 0;
}
</style>
