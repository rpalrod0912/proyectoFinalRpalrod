<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <div>
    <FilterMenu
      @cambTalla="changeParentTalla"
      @cambColor="changeParentColor"
      @cambSale="changeParentSale"
    ></FilterMenu>
  </div>

  <ProductosComponent
    v-if="!filterValue"
    v-bind:carga="this.carga"
    v-bind:imgArray="this.imgArray"
  ></ProductosComponent>
  <ProductosComponent
    v-else-if="
      tipoFiltro === 'color' ||
      tipoFiltro === 'tallas' ||
      tipoFiltro === 'oferta'
    "
    v-bind:carga="this.carga"
    v-bind:imgArray="this.filterArray"
  >
  </ProductosComponent>
  <ul class="pagination">
    <div
      @click="this.pagina = page"
      v-for="(page, index) in this.numeroPaginas"
      :key="index"
      class="contenedorLi"
      :class="{ liSeleccionado: pagina === page }"
    >
      <li>
        {{ page }}
      </li>
    </div>
  </ul>
  <AppFooter></AppFooter>
</template>
<script>
import { API_URL, scrollTop } from "@/helpers/basicHelpers";
import axios from "axios";
import WhiteHeader from "@/components/WhiteHeader.vue";
import ProductosComponent from "@/components/ProductosComponent.vue";
import AppFooter from "@/components/AppFooter.vue";
import FilterMenu from "@/components/FilterMenu.vue";

export default {
  /*eslint-disable */
  name: "ProductosApp",
  components: { WhiteHeader, ProductosComponent, AppFooter, FilterMenu },
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
    if (this.$route.query.oferta === "MOSTRAR") {
      await this.getPages("products/ofertas/paginas");
      await this.cargarPagina("products/ofertas/paginas/", this.pagina);
      this.imgArray = JSON.parse(JSON.stringify(this.datosProd));
      this.carga = true;
    } else if (
      this.$route.query.prodFiltrados === null ||
      this.$route.query.prodFiltrados === undefined
    ) {
      await this.getPages("products/paginas");
      await this.cargarPagina("products/paginas/", this.pagina);
      this.imgArray = JSON.parse(JSON.stringify(this.datosProd));
      this.carga = true;
    } else {
      await this.cargarProductosBusqueda(this.$route.query.prodFiltrados);
      this.imgArray = JSON.parse(JSON.stringify(this.datosProd));
      this.carga = true;
    }

    //this.getPages();
    //this.cargarPagina(1);
  },
  data() {
    return {
      pagina: 1,
      numeroPaginas: [],
      carga: false,
      imgArray: [],
      datosProd: null,
      colorElegido: null,
      tallaElegida: null,
      filterArray: [],
      filterValue: false,
      tipoFiltro: null,
      mostrarOfer: null,
    };
  },

  methods: {
    colorFilterState(val) {
      this.tipoFiltro = "color";
      if (val === "Ninguno") {
        //this.filterValue = false;
        if (
          this.tallaElegida &&
          this.tallaElegida !== "Ninguno" &&
          this.mostrarOfer
        ) {
          console.log(this.tallaElegida);
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.talla.includes(this.tallaElegida) && objeto.oferta !== null
          );
          console.log(this.filterArray);
          this.filterValue = true;
        } else if (this.tallaElegida && this.tallaElegida !== "Ninguno") {
          console.log(this.tallaElegida);
          this.filterArray = this.imgArray.filter((objeto) =>
            objeto.talla.includes(this.tallaElegida)
          );
          this.filterValue = true;
        } else if (this.mostrarOfer) {
          this.filterArray = this.imgArray.filter(
            (objeto) => objeto.oferta !== null
          );
          this.filterValue = true;
        } else {
          this.filterValue = false;
        }
      } else {
        if (
          this.tallaElegida &&
          this.tallaElegida !== "Ninguno" &&
          this.mostrarOfer
        ) {
          console.log(this.tallaElegida);
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.color.includes(this.colorElegido.color) &&
              objeto.talla.includes(this.tallaElegida) &&
              objeto.oferta !== null
          );
          console.log(this.filterArray);
          this.filterValue = true;
        } else if (this.tallaElegida && this.tallaElegida !== "Ninguno") {
          console.log(this.tallaElegida);
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.color.includes(this.colorElegido.color) &&
              objeto.talla.includes(this.tallaElegida)
          );
          this.filterValue = true;
        } else if (this.mostrarOfer) {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.color.includes(this.colorElegido.color) &&
              objeto.oferta !== null
          );
          this.filterValue = true;
        } else {
          this.filterValue = true;
          this.filterArray = this.imgArray.filter((objeto) =>
            objeto.color.includes(this.colorElegido.color)
          );
          console.log(this.filterArray);
          this.filterValue = true;
        }
      }
    },
    filtrarOfertas() {
      if (this.saleFilter) {
        this.filterSalesArr();
      }
    },
    saleFilterState(val) {
      this.tipoFiltro = "oferta";
      if (val) {
        if (
          this.colorElegido &&
          this.colorElegido !== "Ninguno" &&
          this.tallaElegida &&
          this.tallaElegida !== "Ninguno"
        ) {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.talla.includes(this.tallaElegida) &&
              objeto.color.includes(this.colorElegido.color) &&
              objeto.oferta !== null
          );
        } else if (this.colorElegido && this.colorElegido !== "Ninguno") {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.color.includes(this.colorElegido.color) &&
              objeto.oferta !== null
          );
        } else if (this.tallaElegida && this.tallaElegida !== "Ninguno") {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.talla.includes(this.tallaElegida) && objeto.oferta !== null
          );
        } else {
          this.filterArray = this.imgArray.filter(
            (objeto) => objeto.oferta !== null
          );
          console.log(this.imgArray);
          console.log(this.filterArray);
          this.filterValue = true;
        }
      } else {
        if (this.tallaElegida && this.tallaElegida !== "Ninguno") {
          this.sizeFilterState(this.tallaElegida);
        } else if (this.colorElegido && this.tallaElegida !== "Ninguno") {
          this.colorFilterState(this.colorElegido);
        } else {
          this.filterValue = false;
        }
      }
    },
    sizeFilterState(tallaVal) {
      this.tipoFiltro = "tallas";
      const tallasRopa = ["S", "M", "L", "XL"];
      if (tallaVal === "Ninguno") {
        //this.filterValue = false;
        if (
          this.colorElegido &&
          this.colorElegido !== "Ninguno" &&
          this.mostrarOfer
        ) {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.color.includes(this.colorElegido.color) &&
              objeto.oferta !== null
          );
          this.filterValue = true;
        } else if (this.colorElegido && this.colorElegido !== "Ninguno") {
          this.filterArray = this.imgArray.filter((objeto) =>
            objeto.color.includes(this.colorElegido.color)
          );
          this.filterValue = true;
        } else if (this.mostrarOfer) {
          this.filterArray = this.imgArray.filter(
            (objeto) => objeto.oferta !== null
          );
          this.filterValue = true;
        } else {
          this.filterValue = false;
        }
      } else if (!tallasRopa.includes(tallaVal)) {
        if (
          this.colorElegido &&
          this.colorElegido !== "Ninguno" &&
          this.mostrarOfer
        ) {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.talla.includes(tallaVal) &&
              objeto.color.includes(this.colorElegido.color) &&
              objeto.oferta !== null
          );
          this.filterValue = true;
        } else if (this.colorElegido && this.colorElegido !== "Ninguno") {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.talla.includes(tallaVal) &&
              objeto.color.includes(this.colorElegido.color)
          );
          this.filterValue = true;
        } else if (this.mostrarOfer) {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.talla.includes(tallaVal) && objeto.oferta !== null
          );
          this.filterValue = true;
        } else {
          this.filterArray = this.imgArray.filter((objeto) =>
            objeto.talla.includes(tallaVal)
          );
          console.log(this.imgArray);
          console.log(this.filterArray);
          this.filterValue = true;
        }
      } else {
        if (
          this.colorElegido &&
          this.colorElegido !== "Ninguno" &&
          this.mostrarOfer
        ) {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.talla.includes(tallaVal) &&
              objeto.color.includes(this.colorElegido.color) &&
              objeto.oferta !== null
          );
        } else if (this.colorElegido && this.colorElegido !== "Ninguno") {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.talla.includes(tallaVal) &&
              objeto.color.includes(this.colorElegido.color)
          );
        } else if (this.mostrarOfer) {
          this.filterArray = this.imgArray.filter(
            (objeto) =>
              objeto.talla.includes(tallaVal) && objeto.oferta !== null
          );
        } else {
          console.log();
          this.filterArray = this.imgArray.filter((objeto) =>
            objeto.talla.includes(tallaVal)
          );
          console.log(this.filterArray);
          this.filterValue = true;
        }
      }
    },
    filterSalesArr() {
      this.loadOfertas = true;
      this.ofertasArray = this.imgArray.filter((objeto) =>
        objeto.hasOwnProperty("oferta")
      );
      return this.ofertasArray;
    },
    changeParentColor(val) {
      console.log(val);
      this.colorElegido = val;
      this.colorFilterState(val);
    },
    changeParentSale(val) {
      console.log(val);
      this.mostrarOfer = val;
      console.log(this.mostrarOfer);
      this.saleFilterState(val);
    },
    changeParentTalla(val) {
      console.log(val);

      this.tallaElegida = val;
      this.sizeFilterState(val);
    },
    async cargarProductosBusqueda(val) {
      this.carga = false;
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
    async cargarPagina(endPoint, page) {
      this.carga = false;
      console.log(`${API_URL}${endPoint}${page}`);

      const data = await axios
        .get(`${API_URL}${endPoint}${page}`)
        .then((res) => (this.datosProd = res.data));
    },
    async getPages(endPoint) {
      const data = await axios
        .get(`${API_URL}${endPoint}`)
        .then((res) => (this.numeroPaginas = res.data));
      const cantidadPaginas = Object.keys(data).length;
      this.numeroPaginas = cantidadPaginas;
    },
  },
  props: {
    ofertas: String,
  },
  watch: {
    pagina: async function (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.$route.query.oferta === "MOSTRAR") {
          await this.cargarPagina("products/ofertas/paginas/", newVal);
        } else {
          await this.cargarPagina("products/paginas/", newVal);
        }
        this.imgArray = JSON.parse(JSON.stringify(this.datosProd));
        this.carga = true;
        scrollTop();
      }
    },
    imgArray: function (newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        if (this.saleFilter) {
          this.filterSalesArr();
        }
        if (this.filterValue) {
          if (this.tipoFiltro === "tallas") {
            this.sizeFilterState(this.tallaElegida);
          }
          if (this.tipoFiltro === "color") {
            this.colorFilterState(this.colorElegido);
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
@import "../styles/views/ProductosApp.scss";
</style>
