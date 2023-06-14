import express, { type Express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'
import type { Options } from 'http-proxy-middleware'
// import type {} from 'express-serve-static-core'
export type ServerlessHttpProxyOptions = Record<string, Options>

export function createProxyExpressInstance(
  options: ServerlessHttpProxyOptions
): Express {
  const app = express()

  app.use(
    cors({
      origin: true
    })
  )
  Object.entries(options).forEach(([route, option]) => {
    app.use(route, createProxyMiddleware(option))
  })

  return app
}
