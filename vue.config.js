const { defineConfig } = require("@vue/cli-service");
const { GenerateSW } = require("workbox-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  //publicPath: "/proyectoFinalRpalrod/",
  css: {
    //IMPORTANTE DE LO CONTRARIO AL HACER BUILD EL PLUGIN AÑADIRA ESTILOS INDESEADOS
    extract: false,
  },
  pwa: {
    name: "StreetUp",
    themeColor: "#242424",
  },
});
