const { defineConfig } = require('@vue/cli-service');

const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin");

const { VantResolver }  = require('unplugin-vue-components/resolvers');
const ComponnetsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new NodePolyfillWebpackPlugin,
      ComponnetsPlugin({ resolvers: [ VantResolver() ] })
    ]
  }
})
