<template>
  <WhiteHeader tipo="Dark"></WhiteHeader>
  <FilterMenu
    @cambTalla="changeParentTalla"
    @cambColor="changeParentColor"
  ></FilterMenu>

  <ProductosComponent
    v-if="!filterValue"
    v-bind:carga="this.carga"
    v-bind:imgArray="this.imgArray"
  ></ProductosComponent>
  <ProductosComponent
    v-else-if="tipoFiltro === 'color'"
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
    debugger;
    if (
      this.$route.query.prodFiltrados === null ||
      this.$route.query.prodFiltrados === undefined
    ) {
      await this.getPages();
      await this.cargarPagina(this.pagina);
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
    };
  },
  methods: {
    colorFilterState(val) {
      debugger;
      this.tipoFiltro = "color";
      if (val === "Ninguno") {
        this.filterValue = false;
      } else {
        console.log(
          this.imgArray.filter((objeto) =>
            objeto.color.includes(this.colorElegido.color)
          )
        );
        this.filterArray = this.imgArray.filter((objeto) =>
          objeto.color.includes(this.colorElegido.color)
        );
        console.log(this.filterArray);
        this.filterValue = true;
      }
    },
    filtrarOfertas() {
      if (this.saleFilter) {
        this.filterSalesArr();
      }
    },
    sizeFilterState(talla) {
      this.tipoFiltro = "tallas";
      this.tallaSeleccionada = talla;
      this.tallaSeleccionada;
      const tallasRopa = ["S", "M", "L", "XL"];
      if (talla === "Ninguno") {
        this.filterValue = false;
      } else if (!tallasRopa.includes(talla)) {
        this.filterArray = this.imgArray.filter((objeto) =>
          objeto.talla.includes(parseInt(talla))
        );
        this.filterValue = true;
      } else {
        this.filterArray = this.imgArray.filter((objeto) =>
          objeto.talla.includes(talla)
        );
        this.filterValue = true;
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
      debugger;
      console.log(val);
      this.colorElegido = val;
      this.colorFilterState(val);
    },
    changeParentTalla(val) {
      debugger;
      console.log(val);
      this.tallaElegida = val;
      this.sizeFilterState(val);
    },
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
      const data = await axios
        .get(`${API_URL}products/paginas/${page}`)
        .then((res) => (this.datosProd = res.data));
    },
    async getPages() {
      debugger;

      const data = await axios
        .get(`${API_URL}products/paginas`)
        .then((res) => (this.numeroPaginas = res.data));
      const cantidadPaginas = Object.keys(data).length;
      this.numeroPaginas = cantidadPaginas;
    },
  },
  watch: {
    pagina: async function (newVal, oldVal) {
      if (newVal !== oldVal) {
        await this.cargarPagina(newVal);
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

body {
  display: flex;
  flex-direction: column;
}

.contenedorLi {
  width: 3.5rem;
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  margin: 1rem;
  border-radius: 50%;
  border: 2px solid black;
  cursor: pointer;
}
.pagination {
  display: flex;
  justify-content: center;

  list-style: none;
  li {
    cursor: pointer;

    @include fuenteSemiBold;
    margin: 1rem;
  }
}
.liSeleccionado {
  color: aliceblue;
  background-color: black;

  //font-size: 2rem;
}
</style>
