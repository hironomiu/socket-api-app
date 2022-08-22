import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'
import cors from 'cors'
import auth from './api/v1/auth'
// import * as expressSession from 'express-session'
import session from 'express-session'
import cookieParser from 'cookie-parser'

export const setUp = () => {
  const app = express()
  const server = http.createServer(app)

  app.use(express.json())

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

  app.get('/', (req, res) => {
    res.json('/')
  })

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

  const wrap = (middleware: any) => (socket: any, next: any) =>
    middleware(socket.request, {}, next)

  io.use(wrap(cookieParser()))

  io.use(wrap(sessionMiddleware))

  io.use((socket: any, next: any) => {
    const session = socket.request.session
    console.log(socket.request.session.id)
    if (session && session.id) {
      next()
    } else {
      console.log('errorrrrrrr')
      next(new Error('unauthorized'))
    }
  })

  io.on('connection', (socket: any) => {
    console.log('session:', socket.request.session)
    socket.on('message', (msg: any) => {
      console.log('session:', socket.request.session.id)

      console.log(msg)
      io.emit('message', JSON.stringify({ message: msg }))
    })
  })

  return server
}
