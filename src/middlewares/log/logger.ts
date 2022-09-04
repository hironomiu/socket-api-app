import log4js from 'log4js'
import config from './log4js.config'

let console

log4js.configure(config)
console = log4js.getLogger()

export default {
  console,
}
