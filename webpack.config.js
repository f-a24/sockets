module.exports = {
  mode: 'production',
  entry: `${__dirname}/src/client/src/index.ts`,
  output: {
    path: `${__dirname}/src/client/dist`,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['node_modules']
  },
  plugins: [],
  performance: {
    hints: false
  }
};
