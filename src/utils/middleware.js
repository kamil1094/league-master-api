'use strict'

const applyMiddleware = (middleware, app) => {
  for (const f of middleware) {
    f(app)
  }
}

const applyRoutes = (routes, app) => {
  for (const route of routes) {
    const { method, path, handler } = route
    app[method](path, handler)
  }
}

module.exports = {
  applyMiddleware,
  applyRoutes,
}