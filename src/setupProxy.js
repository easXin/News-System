const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',  // /api/xxx  => localhost:5000
    createProxyMiddleware({
      target: 'https://jsonplaceholder.typicode.com', // send request to this end point
      changeOrigin: true,
    })
  );
};