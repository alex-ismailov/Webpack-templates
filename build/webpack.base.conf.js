const path = require('path');// рекомендуется всегда подключать вручную
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const fs = require('fs');


//Пути лучше вывести сразу в отдельную константу
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
    // Необходимо для того чтобы получить доступ к PATHS из других конфигов
    externals: {
        paths: PATHS //Ярлык для PATHS
    },
    entry: {
        app: PATHS.src,
        lk: `${PATHS.src}/lk.js`
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/' // Необходимо для dev-server, публичный.
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
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
                test: /\.pug$/,
                loader: 'pug-loader'
            }, {
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
            }, { // исключительно для примера, если вдруг мы используем css
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
            filename: `${PATHS.assets}css/[name].[hash].css`,
        }),
        // new HtmlWebpackPlugin({
        //     template: `${PATHS.src}/index.html`,
        //     filename: './index.html',
        // }),
        new CopyWebpackPlugin([ //каждый новый путь это новый объект
            { from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img`},
            { from: `${PATHS.src}/static`, to: ''},
        ]),
        // Automatic creation any html pages (Don't forget to RERUN dev server)
        // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
        // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`
        }))
    ]
}