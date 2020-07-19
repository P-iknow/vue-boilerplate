const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './src/main.js',
	output: {
		filename: '[name].js',
		path: path.resolve('./public')
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{ test: /\.vue$/, use: 'vue-loader' },
			{ test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							esModule: false,
						},
					},
				],
			},

		],
	},
	devServer: {
		open: true,
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			title: 'webpack setup',
			templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
				env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
				BASE_URL: "https://piknw-app.com"
			},

		}),
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
};
