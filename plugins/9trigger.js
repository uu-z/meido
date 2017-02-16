import {exec} from 'child_process'

export default {
  name: "trigger",
  start: (meido) => {
    meido.log('debug', 'test start>>>>>')
    meido.emit('start')
    meido.emit('cli:start')
  },
}