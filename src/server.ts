import { setUp } from './app'
import gracefulShutdown from 'http-graceful-shutdown'
import 'dotenv/config'

const server = setUp()

const LISTEN_PORT = Number(process.env.LISTEN_PORT) | 5252

const s = server.listen(LISTEN_PORT, () => {
  console.log(`server listening *:${LISTEN_PORT}`)
})

gracefulShutdown(s, {
  signals: 'SIGINT SIGTERM',
  timeout: 10000,
  onShutdown: () => {
    // TODO: DB,socket ioのクローズを記述
    return new Promise((resolve) => {
      setTimeout(() => null, 100)
      resolve()
    })
  },
  finally: () => {
    console.log('shutdowned')
  },
})
