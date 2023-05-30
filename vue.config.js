const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    //IMPORTANTE DE LO CONTRARIO AL HACER BUILD EL PLUGIN AÑADIRA ESTILOS INDESEADOS
    extract: false,
  },
});
