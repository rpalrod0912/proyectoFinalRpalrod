<template>
  <div>
    <form class="updateData">
      <h1>ACTUALIZAR CONTRASEÑA</h1>

      <div class="updateSec1">
        <label id="labelOldPwd" class="labelUpdateData" for="oldPwd">
          <input
            class="inputUpdateData"
            v-model="this.pwd"
            name="oldPwd"
            type="password"
            id="pwdDataInput"
            required
          />
          <p @click="focusInput('pwdDataInput', 'labelOldPwd')">
            Antigua Contraseña
          </p>
          <div class="borderBottom"></div>
        </label>
        <label id="labelNewPwd" class="labelUpdateData" for="newPwd">
          <input
            class="inputUpdateData"
            v-model="this.newPwd"
            name="newPwd"
            type="password"
            id="newPwdDataInput"
            required
          />
          <p @click="focusInput('newPwdDataInput', 'labelNewPwd')">
            Nueva Contraseña
          </p>
          <img
            v-if="!this.modoTextoInput1"
            @click="showPassword('newPwdDataInput', 'modoTextoInput1')"
            src="../assets/UnHideIcon.png"
          />
          <img
            v-else
            @click="showPassword('newPwdDataInput', 'modoTextoInput1')"
            src="../assets/HideIcon.png"
          />
          <div class="borderBottom"></div>
        </label>
        <label
          id="labelConfirmNewPwd"
          class="labelUpdateData"
          for="confirmNewPwd"
        >
          <input
            class="inputUpdateData"
            name="confirmNewPwd"
            v-model="this.confirNewPwd"
            type="password"
            id="confirmNewPwdDataInput"
            required
          />
          <p @click="focusInput('confirmNewPwdDataInput', 'labelNewPwd')">
            Repetir Nueva Contraseña
          </p>
          <img
            class="pd-3rem"
            v-if="!this.modoTextoInput2"
            @click="showPassword('confirmNewPwdDataInput', 'modoTextoInput2')"
            src="../assets/UnHideIcon.png"
          />

          <img
            v-else
            class="pd-3rem"
            @click="showPassword('confirmNewPwdDataInput', 'modoTextoInput2')"
            src="../assets/HideIcon.png"
          />

          <div class="borderBottom"></div>
        </label>
      </div>

      <ButtonComponent class="saveDataButton" msj="GUARDAR"></ButtonComponent>
    </form>
  </div>
</template>
<script>
/*eslint-disable */
import ButtonComponent from "./ButtonComponent.vue";

export default {
  name: "UserUpdatePassword",
  data() {
    return {
      pwd: this.userData.pwd,
      newPwd: "",
      confirNewPwd: "",
      modoTextoInput1: false,
      modoTextoInput2: false,
    };
  },
  props: {
    userData: Object,
  },
  methods: {
    focusInput(id, idLabel) {
      const elemento = document.querySelector(`#${id}`);
      if (document.activeElement !== elemento) {
        elemento.focus();
      }
    },

    showPassword(id, dataState) {
      let element = document.querySelector(`#${id}`);
      if (element.type === "password") {
        element.type = "text";
        if (dataState === "modoTextoInput1") {
          this.modoTextoInput1 = true;
        }
        if (dataState === "modoTextoInput2") {
          this.modoTextoInput2 = true;
        }
      } else {
        element.type = "password";
        this.dataState = false;
        if (dataState === "modoTextoInput1") {
          this.modoTextoInput1 = false;
        }
        if (dataState === "modoTextoInput2") {
          this.modoTextoInput2 = false;
        }
      }
    },
  },
  components: { ButtonComponent },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
.selectedMenu .updateData .dateInput {
  p {
    bottom: 5.3em;
  }
}

.pd-3rem {
  padding-right: 2.3rem;
}
.updateSec1 {
}
@include updatePasswordForm;
</style>
