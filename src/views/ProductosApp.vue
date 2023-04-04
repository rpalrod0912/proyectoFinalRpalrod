<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <ProductosComponent
    v-bind:carga="this.carga"
    v-bind:imgArray="this.imgArray"
  ></ProductosComponent>
  <AppFooter></AppFooter>
</template>
<script>
import { API_URL } from "@/helpers/basicHelpers";

import WhiteHeader from "@/components/WhiteHeader.vue";
import ProductosComponent from "@/components/ProductosComponent.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  /*eslint-disable */
  name: "ProductosApp",
  components: { WhiteHeader, ProductosComponent, AppFooter },
  created() {
    //METODO DE MI API ANTERIOR SOLO PARA PRUEBAS
    debugger;

    this.getPages();
    this.cargarPagina(1);
    debugger;
  },
  data() {
    return {
      page: 1,
      numeroPaginas: [],
      carga: false,
      imgArray: [],
    };
  },
  methods: {
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
