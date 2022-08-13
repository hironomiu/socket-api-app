import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'
import cors from 'cors'
import auth from './api/v1/auth'
import * as expressSession from 'express-session'
import session from 'express-session'
import cookieParser from 'cookie-parser'

export const setUp = () => {
  const app = express()
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGINS?.split(' '),
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      console.log(msg)
      io.emit('message', JSON.stringify({ message: msg }))
    })
  })

  app.use(express.json())

  app.use(
    cors({
      origin: process.env.CORS_ORIGINS?.split(' '),
      credentials: true,
      optionsSuccessStatus: 200,
    })
  )

  app.use(cookieParser())

  app.use(
    session({
      name: 'session',
      secret: 'session secret',
      resave: false,
      saveUninitialized: false,
      // store:
      cookie: { secure: false },
    })
  )
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

  return server
}
