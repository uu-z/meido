import readline from 'readline'
import {exec} from 'child_process'

export default {
  name: "cli",

  start: (meido) => {

    const rl = readline.createInterface({
      input: process.stdin, 
      output: process.stdout,
      prompt: 'meido>'
    })
    rl.setPrompt('meido> ', 5)

    meido.log('debug', 'cli start>>>>>')
    meido
      .on('cli:start', () => {      
        rl.on('line', line => {
          let newline = line.trim()
          try {
            newline.length > 0 && new Function('meido', `
              try {
                console.log(${newline})
              } catch (err) {
                  console.log(meido.${newline})
              }
            `)(meido)
          } catch(err) {
            console.error(err.toString())
          }

          meido.state.newline = newline
          rl.prompt()
        }).on('close', () => {
          meido.emit('cli:close')
        })
        rl.prompt()
      })
  }
}
// function completer(line) {
//   var completions = '.help .error .exit .quit .q'.split(' ')
//   var hits = completions.filter((c) => {
//     if(c.indexOf(line) === 0) {
//       return c
//     }
//   })
//   return [hits.length ? hits : completions, line]
// }