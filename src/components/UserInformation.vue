<template>
  <div>
    <form class="updateData">
      <h1>DATOS PERSONALES</h1>
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
          <p @click="focusInput('nameDataInput')">Nombre</p>
        </label>
        <label class="labelUpdateData" for="apellidos">
          <input
            class="inputUpdateData"
            v-model="this.apellidos"
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
            v-model="this.phone"
            name="telefonoMovil"
            id="phoneDataInput"
            type="text"
            required
          />
          <p @click="focusInput('phoneDataInput')">Numero móvil</p>
        </label>
      </div>
      <h2>DIRECCIÓN DE FACTURACIÓN</h2>
      <div class="updateSec3">
        <label class="labelUpdateData" for="direccion">
          <input
            class="inputUpdateData"
            name="direccion"
            id="direccionDataInput"
            type="text"
            required
          />
          <p @click="focusInput('direccionDataInput')">Dirección domicilo</p>
        </label>

        <label class="labelUpdateData" for="moreInfo">
          <input
            class="inputUpdateData"
            id="moreInfoDataInput"
            name="moreInfo"
            type="text"
            required
          />
          <p @click="focusInput('moreInfoDataInput')">Mas información...</p>
        </label>
      </div>
      <div class="updateSec4">
        <label class="labelUpdateData" for="provincia">
          <input
            class="inputUpdateData"
            id="codpostalDataInput"
            name="codigoPostal"
            type="text"
            required
          />
          <p @click="focusInput('codpostalDataInput')">Código Postal</p>
        </label>
        <label class="labelUpdateData" for="ciudad">
          <input
            class="inputUpdateData"
            id="ciudadDataInput"
            name="ciudad"
            type="text"
            required
          />
          <p @click="focusInput('ciudadDataInput')">Ciudad</p>
        </label>
      </div>
      <div class="updateSec5">
        <label class="labelUpdateData" for="provincia">
          <input
            id="provinciaDataInput"
            class="inputUpdateData"
            name="provincia"
            type="text"
            required
          />
          <p @click="focusInput('provinciaDataInput')">Provincia</p>
        </label>
        <label class="labelUpdateData" for="mercado">
          <input
            class="inputUpdateData"
            id="mercadoDataInput"
            name="mercado"
            type="text"
            required
          />
          <p @click="focusInput('mercadoDataInput')">Mercado</p>
        </label>
      </div>
      <ButtonComponent class="saveDataButton" msj="GUARDAR"></ButtonComponent>
    </form>
  </div>
</template>
<script>
import ButtonComponent from "./ButtonComponent.vue";

export default {
  name: "UserInformation",
  data() {
    return {
      nombre: this.userData.nombre,
      apellidos: this.userData.apellidos,
      phone: this.userData.phone,
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
