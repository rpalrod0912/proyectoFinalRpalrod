<template>
  <input
    @click="menuAction(true)"
    id="TopMenu__toggle"
    type="checkbox"
    name="checkBusqueda"
  />

  <label @click="menuAction(true)" for="checkBusqueda">
    <img class="searchBar searchMenu" :src="this.modo" />

    <img
      class="searchIcon"
      v-if="this.color === 'Dark'"
      src="../assets/lupaNegra.png"
    />
    <img class="searchIcon" v-else src="../assets/LupaBlanca.png" />
  </label>

  <ul class="TopMenu__box">
    <li class="headerBusq">
      <SearchHeader
        class="TopMenu__item"
        menuButtonColor="Dark"
        tipo="Dark"
      ></SearchHeader>
    </li>
    <div class="TopMenu__item cajaBusqueda">
      <div class="lineaBusqueda">
        <img src="../assets/lupaBlack.png" />
        <input
          type="text"
          v-model="searchInput"
          class="inputBusqueda"
          placeholder="¿QUÉ ESTÁS BUSCANDO?"
          @keydown.enter.prevent="buscarElementos"
        />
      </div>
      <div class="separadorAlterno"></div>
    </div>
    <p class="TopMenu__item textoGrueso">Trending</p>
    <p class="TopMenu__item textoPlano">Sudadera Hombre Blanca</p>
    <p class="TopMenu__item textoPlano">Chaqueta Hombre</p>
    <p class="TopMenu__item textoPlano">Chaqueta Camiseta Blanca</p>

    <div @click="menuAction(false)" class="greyContainer"></div>
  </ul>
</template>
<script>
/*eslint-disable */

import SearchHeader from "../components/SearchHeader.vue";
import axios from "axios";
import { API_URL } from "@/helpers/basicHelpers";
export default {
  created() {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
    if (this.color === "Dark") {
      this.modo = this.busquedaOscuro;
    } else {
      this.modo = this.busquedaClaro;
    }
  },
  name: "MenuBusqueda",
  components: { SearchHeader },
  props: {
    color: String,
  },
  methods: {
    buscarElementos() {
      this.$router.push({
        name: "products",
        query: { prodFiltrados: this.searchInput },
      });
    },
    /*
    async fetchProductsByValue(val) {
      debugger;
      let datos;
      const data = await axios
        .get(`${API_URL}products`)
        .then((res) => (datos = res.data));
      let index = 0;
      let encontrados = [];
      while (index < datos.length) {
        if (
          datos[index].nombre
            .split(" ")
            .join("")
            .toLowerCase()
            .includes(val.split(" ").join("").toLowerCase())
        ) {
          encontrados.push(datos[index]);
        }
        index += 1;
      }
      this.searchsArray = encontrados;
    },
    */
    menuAction(bool) {
      debugger;

      document.querySelector("#logoWhite").classList.toggle("headerError");
      document.querySelector("#loginMenuId").classList.toggle("headerError");
      document.querySelector("#carritoMenuId").classList.toggle("headerError");

      document.querySelector("#TopMenu__toggle").checked = bool;
      if (bool === true) {
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "0";
      }
      if (bool === false) {
        document
          .getElementById("menuGeneral")
          .querySelector(".menu__btn").style.opacity = "1";
      }
      const pageBody = document.querySelector("body");
      pageBody.classList.toggle("bodyStyle");
      /*
      if (document.getElementById("TopMenu__toggle").checked) {
        alert("checked");
      } else {
        alert("You didn't check it! Let me check it for you.");
      }
      */
    },
  },
  data() {
    return {
      modo: null,
      busquedaClaro: require("../assets/whiteSearchBar.png"),
      busquedaOscuro: require("../assets/searchBlack.png"),
      lupaClara: require("../assets/LupaBlanca.png"),
      lupaNegra: require("../assets/lupaNegra.png"),
      searchsArray: null,
      searchInput: "",
    };
  },
  /*
  watch: {
    searchInput(newval, oldval) {
      this.fetchProductsByValue(newval);
    },
    
  },*/
};
</script>
<style lang="scss">
@import "../helpers/mixings.scss";

.bodyStyle {
  overflow: hidden;
}
.menuBotonError {
  display: none;
}

.headerError {
  display: none;
  .menu__btn {
    left: 3.5em;
    top: 6.2em;
  }
}

input[type="text"],
input[type="text"]:focus {
  background: transparent;
  border: none;
  outline-width: 0;
}
.cajaBusqueda {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  align-items: flex-start;
  img {
    width: 4rem;
    height: 4rem;
  }
  .lineaBusqueda {
    display: flex;
    flex-direction: row;
  }
  .inputBusqueda {
    padding-left: 2rem;
    @include fuenteSemiBold;
    font-size: 2rem;
    color: DADADA;
  }
}

#checkedBusqueda {
  display: none;
}
.searchMenu {
  cursor: pointer;
}

.bodyStyle {
  overflow: hidden;
}
@include estiloMenuBusqueda("#TopMenu__toggle", ".menu__btn", ".TopMenu__box");

.TopMenu__item {
  padding: 12px 24px;
  margin-top: 0.5rem;
  position: initial;
}
.textoPlano {
  margin-left: 9%;
  margin-right: 9%;
  @include fuenteSemiBold;
  color: #95a3a4;
  font-size: 1.2rem;
}
.textoGrueso {
  margin-left: 9%;
  margin-right: 9%;
  @include fuenteSemiBold;
  color: black;
  font-size: 1.8rem;
}
.TopMenu__item:hover {
  background-color: #cfd8dc;
}
@media (max-width: 780px) {
  .TopMenu__box {
    height: 100%;
  }

  #TopMenu__toggle:checked ~ .TopMenu__box .greyContainer {
    display: none;
  }
  .headerError {
    display: none;
    .menu__btn {
      left: 3.5em;
      top: 6.2em;
    }
  }
}
@media (min-width: 500px) and (max-width: 550px) {
  .cajaBusqueda {
    .inputBusqueda {
      font-size: 1.8em;
    }
  }
}
@media (min-width: 400px) and (max-width: 499px) {
  .cajaBusqueda {
    img {
      width: 2rem;
      height: 2rem;
    }
    .inputBusqueda {
      font-size: 1.4rem;
    }
  }
}
@media (max-width: 399px) {
  .cajaBusqueda {
    img {
      width: 2rem;
      height: 2rem;
    }
    .inputBusqueda {
      padding-left: 1em;
      font-size: 1.2rem;
    }
  }
}
</style>
