const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    output: {
        path: path.resolve(__dirname, "dist"), //出口路径
        filename: 'olMap.js' //出口名称
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), //最好设置成绝对路径
        hot: true,   // 是否开启热替换，无须手动刷新浏览器
        port: 8888,    // 端口
        open: true,     // 是否自动打开浏览器
        noInfo: true   // 不提示打包信息，错误和警告仍然会显示
    },
    // optimization: {
    //     minimize: false
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /\.\/src/,
                use: {
                    loader: 'babel-loader',
                    options: {presets: ['env']}
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    'url-loader?limit=50240'
                ]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                },{
                    loader: "css-loader"
                }]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',     // 生成的html文件名（相对路径：将生成到output.path指定的dist目录下）
            template: 'index.html'      // 以哪个文件作为模板，不指定的话用默认的空模板
        })
    ],
};
