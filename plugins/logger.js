import winston from 'winston'
winston.level = 'debug'

export default {
  name: "loger",

  start: async (meido) => {
    meido.Queue
      .run(async(queue, next) => {
        meido.log = winston.log
        winston.level = queue.logLevel
        meido.log('debug', 'log start>>>>')
        next()
      })
  }
}