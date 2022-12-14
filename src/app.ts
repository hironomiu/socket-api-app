import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'
import cors from 'cors'
import auth from './api/v1/auth'
// import * as expressSession from 'express-session'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import logger from './middlewares/log/logger'
import accessLogger from './middlewares/log/accessLogger'

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Server API',
      description: 'Server API',
      contact: {
        name: 'Amazing Dev',
      },
      servers: ['http://localhost:5252'],
    },
  },
  apis: ['./src/app.ts', './src/api/v1/*'],
  security: [{ auth: [] }],
}

export const setUp = () => {
  const app = express()
  const server = http.createServer(app)

  app.use(express.json())

  app.disable('x-powered-by')

  app.use(
    cors({
      origin: process.env.CORS_ORIGINS?.split(' '),
      credentials: true,
      optionsSuccessStatus: 200,
    })
  )

  app.use(cookieParser())

  const sessionMiddleware = session({
    name: 'session',
    secret: 'session secret',
    resave: false,
    saveUninitialized: false,
    // store:
    cookie: { secure: false },
  })

  app.use(sessionMiddleware)

  // TODO: optionsを渡す
  app.use(accessLogger({}))

  const swaggerDocs = swaggerJSDoc(swaggerOptions)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

  app.use(
    '/api/v1',
    (() => {
      const router = express.Router()
      router.use('/auth', auth)
      return router
    })()
  )

  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGINS?.split(' '),
      credentials: true,
    },
    cookie: true,
  })

  const wrap = (middleware: any) => (socket: any, next: any) => {
    return middleware(socket.request, {}, next)
  }

  // io.use(wrap(cookieParser()))

  io.use(wrap(sessionMiddleware))

  io.use((socket: any, next: any) => {
    const session = socket.request.session
    if (session && session.id) {
      next()
      // TODO: 上のnextが実行されるとelseなしで下のnextは問題ないか
    } else {
      next(new Error('unauthorized'))
    }
  })

  io.on('connection', (socket: any) => {
    logger.console.info('session:', socket.request.session)
    socket.on('message', (msg: any) => {
      logger.console.info('session:', socket.request.session.id)
      io.emit('message', JSON.stringify({ message: msg }))
    })
  })

  return server
}
