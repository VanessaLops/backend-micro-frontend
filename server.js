const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();


app.use(cors());

const targetUrl = 'https://boasorte.teddybackoffice.com.br/users';

app.use(express.json());
app.use('/api', createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
}));

module.exports = (req, res) => {
  app(req, res);
};
