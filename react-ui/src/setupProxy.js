/**
 * This version of React has buggy dependencies that proxy requests.
 * 
 * We're setting up React's webdev server (which is Express) with 
 * another proxying tool (http-proxy-middleware).
 * 
 * Idea came from this comment: https://github.com/facebook/create-react-app/issues/6720#issuecomment-486641448
 *
 * Other links:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1536843
 * 
 * Manually setting up proxying:
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
 */

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    //   ws: true
    })
  );
};