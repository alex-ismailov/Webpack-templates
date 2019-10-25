const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: __dirname + '/src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist' // Необходимо для dev-server
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader', // Указываем через что необхожимо обрабатывать js файлы
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true}
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: {path: 'src/js/postcss.config.js'}}
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true}
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true}
                    }
                ]
            }
        ]
    },
    devServer: {
        overlay: true //Показ ошибок не в консоли, а в окне браузера
    },
    //регистрируем плагины
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
    ]
};