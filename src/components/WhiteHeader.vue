<template>
  <header>
    <MenuGeneral @click="check" class="menu"></MenuGeneral>
    <img class="logo" src="../assets/LogoOscuroTransparente.png" />
    <ul>
      <li>
        <img class="searchBar" src="../assets/whiteSearchBar.png" />
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
import MenuGeneral from "./MenuGeneral.vue";

export default {
  /*eslint-disable */
  name: "NavBar",
  components: { MenuGeneral },
};
</script>
<style lang="scss" scoped>
header {
  height: 10rem;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  img {
    width: 2.5rem;
    height: 2.5rem;
  }
  width: 100%;
  .menu {
    margin-left: 2rem;
  }
  ul {
    list-style-type: none;

    display: flex;
    margin-right: 2rem;
    marker: none;
    .searchBar {
      width: 13rem;
      margin-left: 0px;
    }
    li {
      margin: 1rem;
    }
  }
  background-color: transparent;

  display: flex;

  .logo {
    position: fixed;
    left: 39%;
    width: 27rem;
    height: 8rem;
  }
}
</style>
