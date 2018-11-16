const path = require('path');

module.exports = {
    entry: "./adminPanel/app.jsx", // входная точка - исходный файл
    output:{
        path: path.resolve(__dirname, './public/js'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/public/js/',
        filename: "admin.js"       // название создаваемого файла
    },
    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            }
        ]
    }
};