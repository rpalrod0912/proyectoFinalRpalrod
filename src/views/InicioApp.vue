<template>
  <WhiteHeader></WhiteHeader>
  <main>
    <section class="secIni1">
      <img src="../assets/imInicioUsoWeb.jpg" />
    </section>
    <section class="secIni2">
      <img src="../assets/imSec2.png" />
    </section>
    <section class="secIni3">
      <img src="../assets/imSec3.jpg" />
    </section>
  </main>
</template>
<script>
import WhiteHeader from "@/components/WhiteHeader.vue";
export default {
  /*eslint-disable */
  name: "InicioApp",
  components: { WhiteHeader },
};
</script>
<style scoped lang="scss">
* {
  margin: 0;
}
body {
  background-color: black;
}
main {
  .secIni1 {
    img {
      width: 100%;
    }
  }
  .secIni2 {
    margin-top: 2rem;
    img {
      width: 100%;
    }
  }

  .secIni3 {
    margin-top: 2rem;
    img {
      width: 100%;
    }
  }
}
</style>
