<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <PopUpModal
    :is-opened="true"
    v-if="this.showPopUp"
    msj="REGISTRADO CON ÉXITO"
  ></PopUpModal>
  <main>
    <RegisterComponent @changePopUpState="setToTrue"></RegisterComponent>
  </main>
</template>
<script>
import RegisterComponent from "@/components/RegisterComponent";
import WhiteHeader from "@/components/WhiteHeader";
import PopUpModal from "@/components/popUpModal.vue";
import { scrollTop } from "@/helpers/basicHelpers";
export default {
  name: "RegisterApp",
  created() {
    scrollTop();
  },
  data() {
    return {
      showPopUp: false,
    };
  },
  methods: {
    setToTrue(val) {
      this.showPopUp = val;
    },
  },
  components: { WhiteHeader, RegisterComponent, PopUpModal },
};
</script>
<style lang="scss" scoped>
body {
  display: flex;
  flex-direction: column;
}
</style>
