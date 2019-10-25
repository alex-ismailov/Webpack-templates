module.exports = {
    plugins: [
        require('autoprefixer'),
        require('css-mqpacker'), // сжимает все media query запросы в один файл
        require('cssnano')({ // минификация
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        })
    ]
}