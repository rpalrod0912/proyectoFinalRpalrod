<template>
  <!--<img alt="Vue logo" src="./assets/logo.png" />-->
  <router-view :key="$route.fullPath" />
</template>

<script>
import { API_URL } from "./helpers/basicHelpers";
/*eslint-disable */
import axios from "axios";
import WhiteHeader from "./components/WhiteHeader.vue";
export default {
  async mounted() {
    if (this.$store.state.currentToken === null) {
      await this.getToken();
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.$store.state.currentToken}`,
      };
    }
  },
  async beforeCreate() {
    const data = await axios
      .post(
        `${API_URL}token`,
        {},
        {
          auth: {
            username: "holajavi@gmail.com",
            password: "suspenso_01",
          },
        }
      )
      .then((res) => {
        this.$store.commit("setCurrentToken", res.data);
      });
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
  },
  async created() {
    await this.getToken();
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
  },
  name: "App",
  methods: {
    async getToken() {
      const data = await axios
        .post(
          `${API_URL}token`,
          {},
          {
            auth: {
              username: "holajavi@gmail.com",
              password: "suspenso_01",
            },
          }
        )
        .then((res) => {
          this.$store.commit("setCurrentToken", res.data);
        });
    },
  },
  components: { WhiteHeader },
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
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  height: 56px;
  border-radius: 8px;
  border: 4px solid transparent;
  background-clip: content-box;
  background-color: #888;
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
@media (max-width: 650px) {
  body {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;
  }
  *::-webkit-scrollbar {
    background: transparent; /* Chrome/Safari/Webkit */
    width: 0px;
  }
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
