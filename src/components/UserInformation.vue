<template>
  <div>
    <form>
      <h1>DATOS PERSONALES</h1>

      <label for="gender">
        <input name="gender" type="radio" value="Hombre" />Hombre
      </label>
      <label for="gender">
        <input name="gender" type="radio" value="Mujer" />Mujer
      </label>
      <div class="updateSec1">
        <label for="nombre">
          <input name="nombre" type="text" />
        </label>
        <label for="apellidos">
          <input name="apellidos" type="text" />
        </label>
      </div>
      <div class="updateSec2">
        <label for="fechaNac">
          <input name="fechaNac" type="date" />
        </label>
        <label for="telefonoMovil">
          <input name="telefonoMovil" type="text" />
        </label>
      </div>
      <h2>DIRECCIÓN DE FACTURACIÓN</h2>
      <div class="updateSec3">
        <label for="direccion">
          <input name="direccion" type="text" />
        </label>

        <label for="moreInfo">
          <input name="moreInfo" type="text" />
        </label>
      </div>
      <div class="updateSec4">
        <label for="provincia">
          <input name="codigoPostal" type="text" />
        </label>
        <label for="ciudad">
          <input name="ciudad" type="text" />
        </label>
        <label for="provincia">
          <input name="provincia" type="text" />
        </label>
        <label for="mercado">
          <input name="mercado" type="text" />
        </label>
      </div>
    </form>
  </div>
</template>
<script></script>
<style lang="scss"></style>
