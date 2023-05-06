<template>
  <div>
    <form class="updateData">
      <h1>ACTUALIZAR CONTRASEÑA</h1>
      <div class="genderDiv">
        <label for="gender">
          <input name="gender" type="radio" value="Hombre" />Hombre
        </label>
        <label for="gender">
          <input name="gender" type="radio" value="Mujer" />Mujer
        </label>
      </div>

      <div class="updateSec1">
        <label class="labelUpdateData">
          <input
            class="inputUpdateData"
            v-model="this.nombre"
            name="nombre"
            type="text"
            required
            id="nameDataInput"
          />
          <p @click="focusInput('nameDataInput')">Antigua Contraseña</p>
        </label>
        <label class="labelUpdateData" for="apellidos">
          <input
            class="inputUpdateData"
            name="apellidos"
            type="text"
            id="apellidosDataInput"
            required
          />
          <p @click="focusInput('apellidosDataInput')">Apellidos</p>
        </label>
      </div>
      <div class="updateSec2">
        <label class="dateInput labelUpdateData" for="fechaNac">
          <input class="inputUpdateData" name="fechaNac" type="date" required />
          <h1 class="dateP">Fecha de Nacimiento</h1>
        </label>
        <label class="labelUpdateData" for="telefonoMovil">
          <input
            class="inputUpdateData"
            v-model="this.pwd"
            name="telefonoMovil"
            id="phoneDataInput"
            type="text"
            required
          />
          <p @click="focusInput('phoneDataInput')">Numero móvil</p>
        </label>
      </div>

      <ButtonComponent class="saveDataButton" msj="GUARDAR"></ButtonComponent>
    </form>
  </div>
</template>
<script>
import ButtonComponent from "./ButtonComponent.vue";

export default {
  name: "UserUpdatePassword",
  data() {
    return {
      pwd: this.userData.pwd,
      newPwd: "",
      confirNewPwd: "",
    };
  },
  props: {
    userData: Object,
  },
  methods: {
    focusInput(id) {
      const elemento = document.querySelector(`#${id}`);
      if (document.activeElement !== elemento) {
        elemento.focus();
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
@include updateDataForm;
</style>
