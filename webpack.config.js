const path = require('path');

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
                test: /\.css$/,
                loader: 'css-loader', // Указываем через что необхожимо обрабатывать js файлы
            }
        ]
    },
    devServer: {
        overlay: true //Показ ошибок не в консоли, а в окне браузера
    }
};