<template>
  <header>
    <img src="../assets/menuBlanco.png" />
    <img class="logo" src="../assets/LogoOscuroTransparente.png" />
    <ul>
      <li>
        <img src="../assets/searchBlanco.png" />
      </li>
      <li>
        <img src="../assets/usuario.png" />
      </li>
      <li>
        <img src="../assets/bolsoBlanco.png" />
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  /*eslint-disable */
  name: "NavBar",
};
</script>
<style lang="scss">
* {
  margin: 0;
}
header {
  height: 10rem;
  img {
    width: 4rem;
    height: 4rem;
  }
  width: 100%;

  ul {
    display: flex;
  }

  display: flex;

  .logo {
    width: 30rem;
    height: 20rem;
  }
}
</style>
