# @icebreakers/serverless-http-proxy

## Usage

```js
// app.js
const {
  createProxyExpressInstance
} = require('@icebreakers/serverless-http-proxy')

const app = createProxyExpressInstance({
  '^/api': {
    target: 'http://api.xxx.com',
    ws: true,
    changeOrigin: true,
    onProxyRes: (proxyRes) => {
      proxyRes.headers['x-target-address']
        = `${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`
    },
    pathRewrite: { '^/api': '' }
  }
})

module.exports = app
```

## Local Start

```js
const app = require('./app')
app.listen(9000)
```

## Serverless Start

### Ali-Cloud

`serverless-devs`:

```js
// index.js
const serverless = require('@serverless-devs/fc-http')

const app = require('./app')

exports.handler = serverless(app)
```

```yml
edition: 1.0.0
name: http-proxy-server-app

access: default

vars: # 全局变量
  region: cn-hangzhou
  service:
    name: web-framework
    description: Serverless Devs Web Framework Service

services:
  framework:
    component: fc
    actions:
      pre-deploy:
        - run: npm install --production
          path: ./code
    props:
      region: ${vars.region}
      service: ${vars.service}
      function:
        name: http-proxy-server
        description: Serverless Devs Web Framework Function
        runtime: nodejs14
        codeUri: ./code
        handler: index.handler
        memorySize: 128
        timeout: 60
      triggers:
        - name: http-trigger
          type: http
          config:
            authType: anonymous
            methods:
              - GET
              - POST
              - PUT
              - DELETE
              - HEAD
      customDomains:
        - domainName: auto
          protocol: HTTP
          routeConfigs:
            - path: /*
```
