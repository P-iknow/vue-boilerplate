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
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, 'src'),
			'~': path.resolve(__dirname),
		},
		extensions: ['.js', '.json', '.vue'],
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{ test: /\.vue$/, use: 'vue-loader' },
			{
				test: /\.scss$/, use: ['vue-style-loader', 'css-loader', {
					loader: 'sass-loader',
					options: {
						sourceMap: true,
						additionalData: `@import "@/scss/_common.scss";`
					}
				}]
			},
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
				BASE_URL: "http://localhost:8080/"
			},

		}),
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
};
