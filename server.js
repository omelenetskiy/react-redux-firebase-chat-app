const path = require('path');
const express = require('express');

const isDevelopment = process.env.NODE_ENV !== 'production';

const app = express();

if (isDevelopment) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./webpack.config');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get('/css/bundle.css', (req, res) => {
    res.sendStatus(200);
  });
}

app.use(express.static(path.resolve(
  isDevelopment ? './src/static' : './dist/'
)));

app.listen(3000, (error) => {
  if (error)
    throw error;
  console.info('... Listening ');
});
