<template>
  <main>
    <div class="contenedorImagenes" v-if="this.carga">
      <div
        @click="this.seeProduct(producto.nombre)"
        v-for="(producto, index) in this.imgArray"
        :key="index"
      >
        <div class="productDiv divMedia">
          <img :src="producto.imagen" />
        </div>
        <div v-if="producto.oferta">
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
  created() {
    debugger;
    console.log(this.carga);
  },
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
      debugger;
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

.saleContainer {
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  width: 75%;
  height: 3rem;
  margin-bottom: 1rem;
  p {
    @include fuenteBold;
    color: white;
  }
  /* border: 10px solid; */
  border-radius: 16px;
  background-color: #d74242;
}
.emptyContainer {
  flex-direction: column;
  display: flex;
  margin: 0 auto;
  /* align-items: center; */
  width: 70%;
  height: 3rem;
}

main {
  width: 100%;
  padding-top: 9rem;
  margin-bottom: 10rem;
}
.contenedorImagenes {
  display: flex;
  flex-wrap: wrap;
  //align-items: center;
  align-items: flex-start;
  justify-content: center;
}
//Para monitores Ultrawide como el mio, no es para el despliegue final

@media (min-width: 1921px) {
  .contenedorImagenes {
    margin-left: 15rem;
    margin-right: 15rem;
  }
}

.redH2 {
  color: #d74242;
}
.productDiv {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 320px;
  height: 488px;
  background-color: beige;
  border-radius: 18px;
  margin: 3rem 3rem 1rem;
  cursor: pointer;

  img {
    width: 15rem;
  }
  .productoInfo1 {
    position: relative;
    right: 29vw;
  }
}
@media (min-width: 300px) and (max-width: 399px) {
  .productDiv {
    margin: 0rem;
  }
}

.textoH2 {
  text-align: center;
  @include fuenteSemiBold;
}

.textoRegular {
  text-align: center;
  @include fuenteRegular;
  margin: 1.4rem;
}
.textoH2Bold {
  text-align: center;
  @include fuenteBold;
  margin: 1.2rem;
}
.spinner {
  display: flex;
  margin: 0 auto;
}
</style>
