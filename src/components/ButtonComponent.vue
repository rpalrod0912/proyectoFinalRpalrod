<template>
  <div class="genericButton">
    <p>{{ this.msj }}</p>
  </div>
</template>
<script>
export default {
  /*eslint-disable */
  name: "ButtonComponent",
  data() {
    return {
      text: this.msj,
    };
  },
  props: {
    msj: String,
  },
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

.genericButton {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  width: 20rem;
  height: 3.2rem;
  background-color: black;
  border: 1px solid black;

  border-radius: 10px;
  p {
    @include fuenteSemiBold;
    font-size: 1.2rem;
    color: white;
  }
}
</style>
