import {exec} from 'child_process'

export default {
  name: "test",
  help:`
    Used to test

    Function:

      plugins.test.hello()  Test      

    `,

  start: (meido) => {
    meido.log('debug', 'test1 start>>>>>')
  },
  add: (meido, ...args) => {
    return args.reduce((a,b) => parseInt(a) + parseInt(b)) 
  }
}