const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devWebpackConf = merge(baseWebpackConfig, {
    // DEV settings gonna be here
    mode: 'development',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist, // где будет открываться webpack
        port: 8081,
        // historyApiFallback: true,
        // noInfo: true,
        overlay: { //Показ ошибок не в консоли, а в окне браузера
            warnings: true,
            errors: true
        }
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        // без этого плагина мы не увидим адрес вложенных стилей scss
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
    ]
});

// export devWebpackConfig
module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConf)
});
