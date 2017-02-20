import winston from 'winston'

export default {
  name: "logger",

  start() {
    this.log = winston.log
    winston.level = this.options.logLevel
    this.log('debug', 'log start>>>>')
    this.observer('log', (log, level = "debug") => {
      this.log(level, log)
    })


    // console.log = (...args) => {
    //   this.log('info', ...args)
    //   if(this.cli) {
    //     this.cli.prompt()
    //   }
    // }
  }
}