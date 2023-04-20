<template>
  <!--<img alt="Vue logo" src="./assets/logo.png" />-->

  <router-view :key="$route.fullPath" />
</template>

<script>
/*eslint-disable */
import axios from "axios";
export default {
  async created() {
    await this.getToken();
    console.log(this.$store.state.currentToken);
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
    const carrito = localStorage.getItem("userProducts");
    if (carrito === null) {
      localStorage.setItem("userProducts", JSON.stringify({ cesta: [] }));
    }
  },
  name: "App",
  methods: {
    async getToken() {
      debugger;
      const data = await axios
        .post(
          "http://localhost:8080/token",
          {},
          {
            auth: {
              username: "holajavi@gmail.com",
              password: "suspenso_01",
            },
          }
        )
        .then((res) => {
          debugger;
          this.$store.commit("setCurrentToken", res.data);
        });

      console.log(data);
      console.log(this.token);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&display=swap");
body {
  overflow: overlay;
}
* {
  margin: 0;
}
/*Estilos Barra de búsqueda*/
*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  border-radius: 8px;
}

*::-webkit-scrollbar-thumb {
  height: 56px;
  border-radius: 8px;
  border: 4px solid transparent;
  background-clip: content-box;
  background-color: #363636;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #363636;
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
