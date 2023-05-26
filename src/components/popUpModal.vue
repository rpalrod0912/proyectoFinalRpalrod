<template>
  <div
    v-if="isOpen"
    @click="
      this.isOpen = false;
      this.$emit('ventanaError', false);
      this.$emit('ventanaBorrarComment', false);
    "
    class="outsideClick"
  ></div>

  <input type="checkbox" v-model="isOpen" id="popMenu__toggle" />

  <ul id="menuBox" class="popMenu__box">
    <div class="popMenu__item textoGuresoh1">
      <div
        @click="
          this.isOpen = false;
          this.$emit('ventanaError', false);
          this.$emit('ventanaBorrarComment', false);
        "
        class="hoverBox"
      >
        <img class="closeModal" src="@/assets/DeleteIcon.png" />
      </div>

      <img class="modalImg" v-if="isError" src="@/assets/cancel.png" />
      <img
        class="modalImg"
        v-else-if="isOperation"
        src="@/assets/alertaPng.png"
      />
      <img class="modalImg" v-else src="@/assets/checked.png" />
      <p>{{ msj }}</p>
      <button
        v-if="isOperation"
        @click="this.$emit('ventanaDeleteComment', true)"
        class="buttonStyle"
      >
        BORRAR
      </button>
    </div>
  </ul>
</template>
<script>
/*eslint-disable */
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
    isError: Boolean,
    isOperation: Boolean,
  },
  emits: {
    ventanaError: null,
    ventanaBorrarComment: null,
    ventanaDeleteComment: null,
  },
  watch: {
    isOpened: function (newVal, OldVal) {
      console.log("VIENDO");
      if (this.newVal) {
        this.isOpen = newVal;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";
@include popUpModal("#popMenu__toggle", ".menu__btn", ".popMenu__box");

.buttonStyle {
  @include buttonStyle;
  margin-top: 1rem;

  margin-bottom: 0rem;
}
.buttonStyle:hover {
  transform: scale(1.1);
}
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
@media (max-width: 500px) {
  #popMenu__toggle:checked ~ .popMenu__box {
    width: 82%;
    .modalImg {
      padding-bottom: 2rem;
    }
    p {
      font-size: 1rem;
    }
  }
}
</style>
