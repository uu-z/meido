import winston from 'winston'

export default {
  name: "loger",

  start: (meido) => {

    meido.log = winston.log
    winston.level = meido.options.logLevel
    meido.log('debug', 'log start>>>>')
  }
}