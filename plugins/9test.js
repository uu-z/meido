import {exec} from 'child_process'

export default {
  name: "test",

  start: (meido) => {
    meido.log('debug', 'test start>>>>>')
    meido.emit('cli:start')


    meido.state.notify = {
      title: 'db',
      message: 'db manager',
      onClick: () => {
        exec(' open http://localhost:8080 ')
      }
    }
  }
}