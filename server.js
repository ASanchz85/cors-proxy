const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
const port = 3001

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5237',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('Origin', 'http://localhost:3000')
    }
  })
)

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`)
})
