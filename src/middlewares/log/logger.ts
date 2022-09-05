import log4js from 'log4js'
import config from './log4js.config'

let console, access

log4js.configure(config)
console = log4js.getLogger()

access = log4js.getLogger('access')
export default {
  console,
  access,
}
