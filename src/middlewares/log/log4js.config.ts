export default {
  appenders: {
    ConsoleLogAppender: {
      type: 'console',
    },
    // TODO: 一旦標準出力にした。将来的にファイルに出すか検討（標準出力で済ます場合はConsoleLogAppenderは不要）
    AccessLogAppender: {
      type: 'console',
    },
  },

  categories: {
    default: {
      appenders: ['ConsoleLogAppender'],
      level: 'ALL',
    },
    access: {
      appenders: ['AccessLogAppender', 'ConsoleLogAppender'],
      level: 'INFO',
    },
  },
}
