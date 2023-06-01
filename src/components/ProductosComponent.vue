<template>
  <main>
    <div class="contenedorImagenes" v-if="this.carga">
      <div
        class="prodContainer"
        @click="this.seeProduct(producto.nombre)"
        v-for="(producto, index) in this.imgArray"
        :key="index"
      >
        <div class="productDiv divMedia">
          <img :src="producto.imagen" alt="productImg" />
        </div>
        <div class="salesParenCont" v-if="producto.oferta">
          <div class="saleContainer">
            <p>DESCUENTO DEL {{ producto.oferta }} %</p>
          </div>
          <h2 class="textoH2">{{ producto.nombre }}</h2>
          <h2 class="redH2 textoH2Bold">
            {{ this.applySale(producto.precio, producto.oferta) }} €
          </h2>
          <p class="textoRegular" v-if="producto.color.length > 1">
            + {{ producto.color.length }} colores
          </p>
        </div>
        <div v-else>
          <div class="emptyContainer">
            <h2 class="textoH2">{{ producto.nombre }}</h2>
            <h2 class="textoH2Bold">{{ producto.precio }} €</h2>
            <p class="textoRegular" v-if="producto.color.length > 1">
              + {{ producto.color.length }} colores
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else><LoadingSpinner class="spinner"></LoadingSpinner></div>
  </main>
</template>
<script>
import LoadingSpinner from "./LoadingSpinner.vue";

/*eslint-disable */
export default {
  name: "ProductosComponent",
  props: {
    carga: {
      type: Boolean,
    },
    imgArray: {
      type: Array,
    },
  },
  components: { LoadingSpinner },
  methods: {
    seeProduct(nombre) {
      this.$router.push({
        name: "product",
        query: { prodNombre: nombre },
      });
    },
    applySale(precio, porcentaje) {
      const resultado = Math.round(precio - (precio * porcentaje) / 100);
      return resultado;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../helpers/mixings.scss";
@import "../styles/components/ProductosComponent.scss";
</style>
