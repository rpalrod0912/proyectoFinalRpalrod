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
@import "../styles/layout/popUpModal.scss";
</style>
