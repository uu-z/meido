import {exec} from 'child_process'

export default {
  name: "test",
  help:`
    Used to test

    Function:

      plugins.test.hello()  Test      

    `,

  start: (meido) => {
    meido.log('debug', 'test start>>>>>')
    meido.emit('cli:start')
  },
  hello: () => {
    return 'world'
  }
}