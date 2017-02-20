import readline from 'readline'
export default {
  name: "cli",

  start() {
    let meido = this
    let rl

    meido.log('debug', 'cli start>>>>>')
    meido
      .on('cli:start', () => {
        rl = readline.createInterface({
          input: process.stdin, 
          output: process.stdout,
          prompt: 'meido> ',
          completer: (line) => {
            var completions = meido.options.completions
            var hits = completions.filter((c) => { return c.indexOf(line) === 0 })
            return [hits.length ? hits : completions, line]
          }
        })
        rl.prompt()

        rl.on('line', line => {
          
          meido.observed.newline = line

        }).on('close', () => {
          meido.emit('cli:close')
        })

        meido.cli = rl        
      }).observer('log', () => {
        if(rl) {
          rl.prompt()
        }
      })
  }
}