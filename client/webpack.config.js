const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// Adding and configuring workbox plugins for a service worker and manifest file.
// Adding CSS loaders and babel to webpack.

module.exports = () => {
  return {
    // Sets to development mode for easier debugging
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      // Defines the output file name based on entry points
      filename: "[name].bundle.js",
      // Output path
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Plugins for webpack
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),
      // Injects service worker into the build
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // Creates manifest.json for PWA configuration
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Text Editor",
        short_name: "texteditor",
        description: "Edit the text whenever!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            // Setting path, size, and destination for the icon
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          // Applies loaders for CSS files
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // Applies Babel loader for JS files
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                // Plugin for object spread syntax
                "@babel/plugin-proposal-object-rest-spread",
                // Plugin to optimize helper functions
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
