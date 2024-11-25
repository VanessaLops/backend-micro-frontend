const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

const targetUrl = 'https://boasorte.teddybackoffice.com.br/users';

app.use(express.json());

app.use('/api', createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove '/api' do caminho da URL antes de encaminhar para o targetUrl
  },
}));

module.exports = (req, res) => {
  app(req, res);
};
