import {exec} from 'child_process'

export default {
  name: "trigger",
  start() {
    this.log('debug', 'test start>>>>>')
    this.emit('start')
    if(!(this.cli)) {
      this.emit('cli:start')
    }
  }
}