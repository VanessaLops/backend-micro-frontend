// api/proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

const targetUrl = 'https://boasorte.teddybackoffice.com.br/users';

module.exports = (req, res) => {

  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
    onProxyReq: (proxyReq, req, res) => {
      
    },
    onProxyRes: (proxyRes, req, res) => {
      let originalBody = '';
      
      proxyRes.on('data', chunk => {
        originalBody += chunk;
      });
      
      proxyRes.on('end', () => {
        try {
          const data = JSON.parse(originalBody);
          res.json(data); 
        } catch (error) {
          res.status(500).json({ error: 'Erro ao processar a resposta da API' });
        }
      });
    },
    router: {
      'POST': targetUrl,
      'GET': targetUrl,
      'GET /users/:id': targetUrl,
      'PATCH': targetUrl,
      'DELETE': targetUrl
    }
  });

  // Ativa o proxy middleware
  return proxy(req, res);
};
