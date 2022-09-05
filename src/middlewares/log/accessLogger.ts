import log4js from 'log4js'
import logger from './logger'

const DEFAULT_LOG_LEVEL = 'auto'

const accessLogger = (options: any) => {
  options = options || {}
  options.level = options.level || DEFAULT_LOG_LEVEL

  return log4js.connectLogger(logger.access, options)
}
export default accessLogger
