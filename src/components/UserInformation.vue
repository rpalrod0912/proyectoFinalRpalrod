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
          />
          <p>Nombre</p>
        </label>
        <label class="labelUpdateData" for="apellidos">
          <input
            class="inputUpdateData"
            v-model="this.apellidos"
            name="apellidos"
            type="text"
            required
          />
          <p>Apellidos</p>
        </label>
      </div>
      <div class="updateSec2">
        <label class="dateInput labelUpdateData" for="fechaNac">
          <input class="inputUpdateData" name="fechaNac" type="date" required />
          <p class="dateP">Fecha de Nacimiento</p>
        </label>
        <label class="labelUpdateData" for="telefonoMovil">
          <input
            class="inputUpdateData"
            v-model="this.phone"
            name="telefonoMovil"
            type="text"
            required
          />
          <p>Numero móvil</p>
        </label>
      </div>
      <h2>DIRECCIÓN DE FACTURACIÓN</h2>
      <div class="updateSec3">
        <label class="labelUpdateData" for="direccion">
          <input
            class="inputUpdateData"
            name="direccion"
            type="text"
            required
          />
          <p>Dirección domicilo</p>
        </label>

        <label class="labelUpdateData" for="moreInfo">
          <input class="inputUpdateData" name="moreInfo" type="text" required />
          <p>Mas información...</p>
        </label>
      </div>
      <div class="updateSec4">
        <label class="labelUpdateData" for="provincia">
          <input
            class="inputUpdateData"
            name="codigoPostal"
            type="text"
            required
          />
          <p>Código Postal</p>
        </label>
        <label class="labelUpdateData" for="ciudad">
          <input class="inputUpdateData" name="ciudad" type="text" required />
          <p>Ciudad</p>
        </label>
      </div>
      <div class="updateSec5">
        <label class="labelUpdateData" for="provincia">
          <input
            class="inputUpdateData"
            name="provincia"
            type="text"
            required
          />
          <p>Provincia</p>
        </label>
        <label class="labelUpdateData" for="mercado">
          <input class="inputUpdateData" name="mercado" type="text" required />
          <p>Mercado</p>
        </label>
      </div>
    </form>
  </div>
</template>
<script>
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
};
</script>
<style lang="scss" scoped>
.selectedMenu .updateData .dateInput {
  p {
    bottom: 5.3em;
  }
}
.dateP {
  bottom: 5.3em;
}
.updateData {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2,
  input[type="text"],
  input[type="date"],
  input[type="radio"] {
    padding: 1.2rem;
  }

  .labelUpdateData {
    p {
      position: relative;
      bottom: 5.3em;
      left: 1.5em;
      transition: 0.3s;
      font-size: 0.8rem;
    }
    .inputUpdateData {
      margin: 0.4rem;
      background-color: #f9f9f9;
      border: none;
      /* height: 1rem; */
      padding-top: 1.7rem;
      border-bottom: 1px solid #c8c8c8;
      transition: 0.07s;
      font-size: 0.9rem;
      border-radius: 4px;
    }
    .inputUpdateData:not(:focus):invalid ~ p {
      bottom: 3rem;
      font-size: 1rem;
    }
    .inputUpdateData:invalid:focus {
      border-bottom: 2px solid red;
    }

    .inputUpdateData:focus {
      outline: none;
      border-bottom: 2px solid green;
    }
  }

  .genderDiv {
    label,
    input[type="radio"] {
      padding: 0.3rem;
    }
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .updateSec2 {
    align-items: flex-end;
    input[type="date"] {
      padding-left: 5rem;
    }
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .labelUpdateData {
    }
  }
}
</style>
