import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'
import type { Options } from 'http-proxy-middleware'

export type ServerlessHttpProxyOptions = Record<string, Options>

export function createProxyExpressInstance(
  options: ServerlessHttpProxyOptions
) {
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
