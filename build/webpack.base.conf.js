const path = require('path');// рекомендуется всегда подключать вручную
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

//Пути лучше вывести сразу в отдельную константу
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
};

module.exports = {
    // Необходимо для того чтобы получить доступ к PATHS из других конфигов
    externals: {
        paths: PATHS //Ярлык для PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/' // Необходимо для dev-server, публичный.
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader', // Указываем через что необхожимо обрабатывать js файлы
                exclude: '/node_modules/'
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            },{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },{
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true}
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: {path: `${__dirname}/build/postcss.config.js`}}
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true}
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true}
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: {path: `${__dirname}/build/postcss.config.js`}}
                    }
                ]
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    //регистрируем плагины
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new CopyWebpackPlugin([ //каждый новый путь это новый объект
            { from: `${PATHS.src}/img`, to: `${PATHS.assets}img`},
            { from: `${PATHS.src}/static`, to: ''},
        ])
    ]
}