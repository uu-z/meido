import {exec} from 'child_process'

export default {
  name: "trigger",
  start: (meido) => {
    meido.log('debug', 'test start>>>>>')
    meido.emit('start')
    if(!(meido.cli)) {
      meido.emit('cli:start')
    }
  }
}