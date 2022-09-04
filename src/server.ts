import { setUp } from './app'
import gracefulShutdown from 'http-graceful-shutdown'
import logger from './middlewares/log/logger'
import 'dotenv/config'

const server = setUp()

const LISTEN_PORT = Number(process.env.LISTEN_PORT) | 5252

const s = server.listen(LISTEN_PORT, () => {
  logger.console.info(`server listening *:${LISTEN_PORT}`)
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
    logger.console.info('shutdowned')
  },
})
