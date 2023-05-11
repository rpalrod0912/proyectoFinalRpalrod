<template>
  <div>
    <form class="updateData">
      <h1>ACTUALIZAR EMAIL</h1>

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
            v-model="this.oldMail"
            name="oldMail"
            type="email"
            id="newPwdDataInput"
            required
          />
          <p @click="focusInput('newPwdDataInput', 'labelNewPwd')">
            Antiguo Email
          </p>
        </label>
        <label
          id="labelConfirmNewPwd"
          class="labelUpdateData"
          for="confirmNewPwd"
        >
          <input
            class="inputUpdateData"
            name="newMail"
            v-model="this.newMail"
            type="email"
            id="confirmNewPwdDataInput"
            required
          />
          <p @click="focusInput('confirmNewPwdDataInput', 'labelNewPwd')">
            Nuevo Email
          </p>
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
  name: "UserUpdateMail",
  data() {
    return {
      pwd: "",
      oldMail: "",
      newMail: "",
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
.updateData {
  h1 {
    padding-bottom: 3rem;
  }
  label {
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
  }
  .saveDataButton {
    width: 20rem;
  }
}
.selectedMenu .updateData .dateInput {
  p {
    bottom: 5.3em;
  }
}

.pd-3rem {
  padding-right: 2.3rem;
}
.updateSec1 {
  flex-direction: column;
}
@include updateDataForm;
</style>
