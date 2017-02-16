import readline from 'readline'
import {exec} from 'child_process'

export default {
  name: "cli",

  start: (meido) => {

    meido.log('debug', 'cli start>>>>>')
    meido
      .on('cli:start', () => {
        const rl = readline.createInterface({
          input: process.stdin, 
          output: process.stdout,
          prompt: 'meido>',
          completer: (line) => {
            var completions = meido.options.completions
            var hits = completions.filter((c) => { return c.indexOf(line) === 0 })
            return [hits.length ? hits : completions, line]
          }
        })
        rl.setPrompt('meido> ', 5) 
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
