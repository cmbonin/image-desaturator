var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
	devtool: 'source-map',
  module: {
    loaders: [
      {
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src'),
        test: /\.jsx?$/
      },
			{
        // required by bootstrap.css
				loader: 'file',
				test: /\.(eot|svg|ttf|woff2?)$/
			},
			{
				loader: 'style!css',
				test: /\.css$/
			},
			{
				// SASS loader for app styles
        include: [path.resolve(__dirname, 'src/styles')],
				loader: 'style!css!sass?outputStyle=expanded',
        test: /\.scss$/
      },
			{
				// SASS loader for module components
				loader: 'style!css!sass?outputStyle=expanded',
				include: [path.resolve(__dirname, 'src/components')],
        test: /\.scss$/
			},
    ]
  }
};
