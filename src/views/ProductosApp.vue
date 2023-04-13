<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <ProductosComponent
    v-bind:carga="this.carga"
    v-bind:imgArray="this.imgArray"
  ></ProductosComponent>
  <AppFooter></AppFooter>
</template>
<script>
import { API_URL, scrollTop } from "@/helpers/basicHelpers";
import axios from "axios";
import WhiteHeader from "@/components/WhiteHeader.vue";
import ProductosComponent from "@/components/ProductosComponent.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  /*eslint-disable */
  name: "ProductosApp",
  components: { WhiteHeader, ProductosComponent, AppFooter },
  async created() {
    if (document.querySelector("body").classList.contains("bodyStyle")) {
      document.querySelector("body").classList.toggle("bodyStyle");
    }
    scrollTop();
    axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$store.state.currentToken}`,
    };
    console.log(this.$);
    //METODO DE MI API ANTERIOR SOLO PARA PRUEBAS
    debugger;
    if (
      this.$route.query.prodFiltrados === null ||
      this.$route.query.prodFiltrados === undefined
    ) {
      await this.cargarProductos();
      debugger;
      console.log(this.datosProd);
      this.imgArray = JSON.parse(JSON.stringify(this.datosProd));
      console.log(this.imgArray);
      this.carga = true;
    } else {
      await this.cargarProductosBusqueda(this.$route.query.prodFiltrados);
      debugger;
      console.log(this.datosProd);
      this.imgArray = JSON.parse(JSON.stringify(this.datosProd));
      console.log(this.imgArray);
      this.carga = true;
    }

    //this.getPages();
    //this.cargarPagina(1);
  },
  data() {
    return {
      page: 1,
      numeroPaginas: [],
      carga: false,
      imgArray: [],
      datosProd: null,
    };
  },
  methods: {
    async cargarProductosBusqueda(val) {
      this.carga = false;
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
      this.datosProd = encontrados;
    },
    async cargarProductos() {
      this.carga = false;
      const data = await axios
        .get(`${API_URL}products`)
        .then((res) => (this.datosProd = res.data));
    },
    async cargarPagina(page) {
      debugger;
      this.carga = false;
      const data = await fetch(`${API_URL}productos/paginas/${page}`).then(
        (res) => res.json()
      );
      this.imgArray = data;
      console.log(this.imgArray);

      this.carga = true;
    },
    async getPages() {
      debugger;

      const data = await fetch(`${API_URL}productos/paginas`).then((res) =>
        res.json()
      );
      const cantidadPaginas = Object.keys(data).length;
      this.numeroPaginas = cantidadPaginas;
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  display: flex;
  flex-direction: column;
}
</style>
