const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = (env) => {

  process.env.PRODUCTION = 'off';

  process.env.REACT_APP_HOST_URL= process.env.PRODUCTION === 'on' 
    ? 'https://current-production-project-url.com' 
    : 'http://localhost:3000';
  
  //process.env.REACT_APP_REMOTE_URL= process.env.PRODUCTION === 'on' 
  //  ? 'https://mf-prduction-remote-url.com' 
  //  : 'http://localhost:3001';

  console.log('Production: ', process.env.PRODUCTION);
  console.log('Host: ' + process.env.REACT_APP_HOST_URL);
  //console.log('Remote Url: ' + process.env.REACT_APP_REMOTE_URL);
  
  return {
    entry: './src/index.ts',
    output: {
      filename: 'bundle_host.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: `${process.env.REACT_APP_HOST_URL}/`,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3000,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          type: "javascript/auto",
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          use: ["style-loader", "css-loader", "postcss-loader"],
          test: /\.(css|s[ac]ss)$/i,
        },
        {
          use:  "babel-loader",
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
        },
        {
          type: 'asset',
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
        },
      ],
    },

    plugins: [
      new Dotenv({
        // .env path
        path: `.env${env.file ? `.${env.file}` : ''}`,
        allowEmptyValues: true,
      }),
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          // Example for you remote MF
          //remote_mf: `remote_mf@${process.env.REACT_APP_REMOTE_URL}/remoteEntry.js`,
        },
        exposes: {
          // Pages or components exposes
          "./FooterSmall": "./src/components/Footers/FooterSmall.tsx",
          "./IndexNavbar": "./src/components/Navbars/IndexNavbar.tsx",
          "./IndexDropdown": "./src/components/Dropdowns/IndexDropdown.tsx",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
      }),
    ],
  }
}
