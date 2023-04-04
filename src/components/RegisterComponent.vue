<template>
  <form class="registerWindow" type="submit">
    <label for="firstNameInput">
      <h1>INTRODUCE TU NOMBRE</h1>
    </label>
    <div class="passwordInput">
      <input
        id="firstNameInput"
        name="firstNameInput"
        type="text"
        placeholder="Nombre"
      />
    </div>
    <label for="lastNameInput">
      <h1>INTRODUCE TUS APELLIDOS</h1>
    </label>
    <div class="passwordInput">
      <input
        id="lastNameInput"
        name="lastNameInput"
        type="text"
        placeholder="Apellidos"
      />
    </div>
    <label for="passInput">
      <h1>CREA TU CONTRASEÑA</h1>
    </label>
    <div class="passwordInput">
      <input
        id="passInput"
        name="passInput"
        type="text"
        placeholder="Contraseña"
      />
    </div>

    <label for="repPassInput">
      <h1>REPITE TU CONTRASEÑA</h1>
    </label>
    <div class="passwordInput">
      <input
        id="repPassInput"
        name="repPassInput"
        type="text"
        placeholder="Contraseña"
      />
    </div>

    <label for="repPassInput"> <h1>INTRODUCE TU NÚMERO DE TELÉFONO</h1> </label>
    <div class="passwordInput">
      <input
        id="repPassInput"
        name="repPassInput"
        type="text"
        placeholder="Apellidos"
      />
    </div>

    <input class="registerSubmit" type="submit" />
  </form>
</template>
<script>
export default {
  name: "RegisterComponent",
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

.registerWindow {
  @include formWindow;
  input[type="password"],
  input[type="password"]:focus,
  input[type="text"],
  input[type="password"]:focus {
    margin-bottom: 2rem;
  }
  .registerSubmit {
    @include loginButton("black", "white", 3rem);
    height: 3.5rem;
    padding-top: 0rem;
    padding-bottom: 0rem;
    margin-bottom: 3rem;
  }
}
</style>
