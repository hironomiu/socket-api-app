import { setUp } from './app'
import 'dotenv/config'

const server = setUp()

const LISTEN_PORT = Number(process.env.LISTEN_PORT) | 5252

server.listen(LISTEN_PORT, () => {
  console.log(`server listening *:${LISTEN_PORT}`)
})
