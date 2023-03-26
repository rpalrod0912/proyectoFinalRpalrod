<template>
  <!--<img alt="Vue logo" src="./assets/logo.png" />-->

  <router-view />

  <router-link to="/">Inicio</router-link>
  <router-link to="/prueba">PRUEBA</router-link>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
}
body {
  background-color: black;
}
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: black;
}
*/
</style>
